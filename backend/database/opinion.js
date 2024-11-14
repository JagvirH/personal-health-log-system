"use server";
import { connectToDB } from "@/backend/database/postgres"; // Connect to PostgreSQL

export async function getOpinion({ logId }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = 'SELECT * FROM opinions WHERE logid = $1';

    try {
        const { rows: results } = await connection.query(sql, [logId]);
        return results.length ? results[0] : null; // Return the first result if any, otherwise null
    } catch (error) {
        console.error("Error fetching opinion:", error);
        return null;
    } finally {
        connection.end();
    }
}

export async function insertOrUpdateOpinion({ logId, whoId, description }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const selectSql = 'SELECT * FROM opinions WHERE logid = $1';
    const insertSql = 'INSERT INTO opinions (logid, whoid, description) VALUES ($1, $2, $3)';
    const updateSql = 'UPDATE opinions SET whoid = $1, description = $2 WHERE logid = $3';

    try {
        const { rows: results } = await connection.query(selectSql, [logId]);
        if (results.length > 0) {
            // Update existing opinion
            await connection.query(updateSql, [whoId, description, logId]);
        } else {
            // Insert new opinion
            await connection.query(insertSql, [logId, whoId, description]);
        }
    } catch (error) {
        console.error("Error inserting or updating opinion:", error);
    } finally {
        connection.end();
    }
}

export async function getWhoOptions() {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = 'SELECT * FROM who';

    try {
        const { rows: results } = await connection.query(sql);
        return results;
    } catch (error) {
        console.error("Error fetching who options:", error);
        return [];
    } finally {
        connection.end();
    }
}
