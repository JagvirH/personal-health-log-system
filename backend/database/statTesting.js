"use server";
import { connectToDB } from "@/backend/database/postgres"; // Connect to PostgreSQL

// Existing function to add logs
export async function testAddLog({ userId, title, description }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `INSERT INTO logs (users_id, title, description, status, bookmark, share) VALUES ($1, $2, $3, 'Ongoing', false, false);`;

    try {
        const result = await connection.query(sql, [userId, title, description]);
        return result.insertId;
    } catch (error) {
        console.log("Error adding log:", error);
        throw error;
    } finally {
        connection.end();
    }
}

// Function to add tags to a log
export async function testAddTagsToLog(logId, tagIds) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `INSERT INTO log_tags (logid, tagid) VALUES ($1, $2);`;

    try {
        for (const tagId of tagIds) {
            await connection.query(sql, [logId, tagId]);
        }
    } catch (error) {
        console.log("Error adding tags:", error);
        throw error;
    } finally {
        connection.end();
    }
}

// Function to add solutions to a log
export async function testAddSolutionsToLog(logId, solutions) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `INSERT INTO solutions (logid, solution) VALUES ($1, $2);`;

    try {
        for (const solution of solutions) {
            await connection.query(sql, [logId, solution]);
        }
    } catch (error) {
        console.log("Error adding solutions:", error);
        throw error;
    } finally {
        connection.end();
    }
}

export async function testAddOpinionToLog(logId, opinions) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `INSERT INTO opinions (logid, description, whoid) VALUES ($1, $2, $3);`;

    try {
        for (const [description, whoId] of opinions) {
            await connection.query(sql, [logId, description, whoId]);
        }
    } catch (error) {
        console.log("Error adding opinions:", error);
        throw error;
    } finally {
        connection.end();
    }
}

// Function to delete a log
export async function testDeleteLog({ id }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `DELETE FROM logs WHERE users_id = $1;`;

    try {
        await connection.query(sql, [id]);
        console.log("Log deleted");
    } catch (error) {
        console.log("Error deleting log:", error);
    } finally {
        connection.end();
    }
}
