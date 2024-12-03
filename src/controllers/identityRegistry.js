const hederaService = require('../services/hederaService');
const dbService = require('../services/databaseService');

class IdentityRegistryController {
    async createIdentity(req, res) {
        try {
            const { account, level } = req.body;
            const receipt = await hederaService.executeContractFunction(
                process.env.IDENTITY_REGISTRY_CONTRACT_ID,
                "createIdentity",
                [account, level]
            );

            // Store in database
            await dbService.createIdentity({
                accountAddress: account,
                identityLevel: level
            });

            res.json({ status: "success", receipt });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateIdentityLevel(req, res) {
        try {
            const { account, newLevel } = req.body;
            const receipt = await hederaService.executeContractFunction(
                process.env.IDENTITY_REGISTRY_CONTRACT_ID,
                "updateIdentityLevel",
                [account, newLevel]
            );

            await dbService.updateIdentityLevel(account, newLevel);

            res.json({ status: "success", receipt });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new IdentityRegistryController();