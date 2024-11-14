"use server";
import { connectToDB } from "@/backend/database/postgres"; // Connect to PostgreSQL

export async function getSolution({ logId }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const query = 'SELECT * FROM solutions WHERE logid = $1';

    try {
        const { rows } = await connection.query(query, [logId]);
        
        if (rows.length === 0) {
            return ""; // Return an empty string if no solution found
        } else {
            return rows[0].solution; // Assuming the solution is in a column named 'solution'
        }
    } catch (error) {
        console.error("Error fetching solution:", error);
        return "";
    } finally {
        connection.end();
    }
}

export async function insertOrUpdateSolution({ logId, solution }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const selectSql = 'SELECT * FROM solutions WHERE logid = $1';
    const insertSql = 'INSERT INTO solutions (logid, solution) VALUES ($1, $2)';
    const updateSql = 'UPDATE solutions SET solution = $1 WHERE logid = $2';

    try {
        const { rows: results } = await connection.query(selectSql, [logId]);
        if (results.length > 0) {
            // Update existing solution
            await connection.query(updateSql, [solution, logId]);
        } else {
            // Insert new solution
            await connection.query(insertSql, [logId, solution]);
        }
    } catch (error) {
        console.error("Error inserting or updating solution:", error);
    } finally {
        connection.end();
    }
}
