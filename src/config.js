require('dotenv').config();

module.exports = {
    hederaOperatorId: process.env.HEDERA_OPERATOR_ID,
    hederaOperatorKey: process.env.HEDERA_OPERATOR_KEY,
    assetControllerContractId: process.env.ASSET_CONTROLLER_CONTRACT_ID,
    identityRegistryContractId: process.env.IDENTITY_REGISTRY_CONTRACT_ID,
    policyEngineContractId: process.env.POLICY_ENGINE_CONTRACT_ID,
};