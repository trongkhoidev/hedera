const hederaService = require('../services/hederaService');

class AssetController {
    async createAsset(req, res) {
        try {
            const { token, authority, delegate } = req.body;
            const receipt = await hederaService.executeContractFunction(
                process.env.ASSET_CONTROLLER_CONTRACT_ID,
                "createAsset",
                [token, authority, delegate]
            );
            res.json({ status: "success", receipt });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAsset(req, res) {
        try {
            const { token, newDelegate } = req.body;
            const receipt = await hederaService.executeContractFunction(
                process.env.ASSET_CONTROLLER_CONTRACT_ID,
                "updateAsset",
                [token, newDelegate]
            );
            res.json({ status: "success", receipt });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async closeAsset(req, res) {
        try {
            const { token } = req.body;
            const receipt = await hederaService.executeContractFunction(
                process.env.ASSET_CONTROLLER_CONTRACT_ID,
                "closeAsset",
                [token]
            );
            res.json({ status: "success", receipt });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AssetController();