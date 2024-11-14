import { Client } from 'pg';

export const connectToDB = async () => {
    const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT || 5432,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        throw error;
    }

    return client;
};
