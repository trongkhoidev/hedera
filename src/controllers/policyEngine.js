const hederaService = require('../services/hederaService');
const dbService = require('../services/databaseService');

class PolicyEngineController {
    async createPolicy(req, res) {
        try {
            const { asset, policyType, limit, timeframe } = req.body;
            const receipt = await hederaService.executeContractFunction(
                process.env.POLICY_ENGINE_CONTRACT_ID,
                "createPolicy",
                [asset, policyType, limit, timeframe]
            );

            await dbService.createPolicy({
                assetAddress: asset,
                policyType,
                limitValue: limit,
                timeframe
            });

            res.json({ status: "success", receipt });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePolicy(req, res) {
        try {
            const { policyId, newLimit, newTimeframe } = req.body;
            const receipt = await hederaService.executeContractFunction(
                process.env.POLICY_ENGINE_CONTRACT_ID,
                "updatePolicy",
                [policyId, newLimit, newTimeframe]
            );

            await dbService.updatePolicy(policyId, newLimit, newTimeframe);

            res.json({ status: "success", receipt });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PolicyEngineController();