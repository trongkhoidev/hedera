const { Client, AccountId, PrivateKey, ContractExecuteTransaction } = require("@hashgraph/sdk");

class HederaService {
    constructor() {
        this.client = Client.forTestnet();
        this.client.setOperator(
            AccountId.fromString(process.env.HEDERA_OPERATOR_ID),
            PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY)
        );
    }

    async executeContractFunction(contractId, functionName, params) {
        const transaction = new ContractExecuteTransaction()
            .setContractId(contractId)
            .setFunction(functionName, params)
            .freezeWith(this.client);

        const signTx = await transaction.sign(PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY));
        const txResponse = await signTx.execute(this.client);
        const receipt = await txResponse.getReceipt(this.client);

        return receipt;
    }
}

module.exports = new HederaService();