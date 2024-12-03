const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

class DatabaseService {
    async createAssetEvent(eventData) {
        const query = `
            INSERT INTO asset_events (token_address, event_type, data, block_number, timestamp)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING *
        `;
        const values = [eventData.token, eventData.eventType, eventData.data, eventData.blockNumber];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }

    async getAssetsByMint(mintAddress) {
        const query = `
            SELECT * FROM assets 
            WHERE token_address = $1 
            ORDER BY created_at DESC
        `;
        
        try {
            const result = await pool.query(query, [mintAddress]);
            return result.rows;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }

    // Add more database methods as needed
}

module.exports = new DatabaseService();