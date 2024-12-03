const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function up() {
    await client.connect();

    // Create assets table
    await client.query(`
        CREATE TABLE assets (
            id SERIAL PRIMARY KEY,
            token_address VARCHAR(255) NOT NULL,
            authority_address VARCHAR(255) NOT NULL,
            delegate_address VARCHAR(255),
            version INTEGER NOT NULL DEFAULT 1,
            closed BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create identity_registry table
    await client.query(`
        CREATE TABLE identities (
            id SERIAL PRIMARY KEY,
            account_address VARCHAR(255) NOT NULL,
            identity_level INTEGER NOT NULL,
            version INTEGER NOT NULL DEFAULT 1,
            active BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create policy_engine table
    await client.query(`
        CREATE TABLE policies (
            id SERIAL PRIMARY KEY,
            policy_id VARCHAR(255) NOT NULL,
            asset_address VARCHAR(255) NOT NULL,
            policy_type INTEGER NOT NULL,
            limit_value BIGINT NOT NULL,
            timeframe INTEGER NOT NULL,
            active BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await client.end();
}

async function down() {
    await client.connect();
    
    await client.query('DROP TABLE IF EXISTS policies');
    await client.query('DROP TABLE IF EXISTS identities');
    await client.query('DROP TABLE IF EXISTS assets');
    
    await client.end();
}

module.exports = { up, down };