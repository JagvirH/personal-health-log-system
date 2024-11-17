"use server"
import mysql from 'mysql2/promise';
import { connectToDB } from "@/backend/database/mySql";

export async function getOpinion({ logId }) {
    let connection = await connectToDB();
    const sql = 'SELECT * FROM Opinions WHERE LogId = ?';

    try {
        const [results] = await connection.execute(sql, [logId]);
        return results.length ? results[0] : null; // Return the first result if any, otherwise null
    } catch (error) {
        console.error("Error fetching opinion:", error);
        return null;
    } finally {
        connection.end();
    }
}

export async function insertOrUpdateOpinion({ logId, whoId, description }) {
    let connection = await connectToDB();
    const selectSql = 'SELECT * FROM Opinions WHERE LogId = ?';
    const insertSql = 'INSERT INTO Opinions (LogId, WhoId, Description) VALUES (?, ?, ?)';
    const updateSql = 'UPDATE Opinions SET WhoId = ?, Description = ? WHERE LogId = ?';

    try {
        const [results] = await connection.execute(selectSql, [logId]);
        if (results.length > 0) {
            // Update existing opinion
            await connection.execute(updateSql, [whoId, description, logId]);
        } else {
            // Insert new opinion
            await connection.execute(insertSql, [logId, whoId, description]);
        }
    } catch (error) {
        console.error("Error inserting or updating opinion:", error);
    } finally {
        connection.end();
    }
}

export async function getWhoOptions() {
    let connection = await connectToDB();
    const sql = 'SELECT * FROM Who';

    try {
        const [results] = await connection.execute(sql);
        return results;
    } catch (error) {
        console.error("Error fetching who options:", error);
        return [];
    } finally {
        connection.end();
    }
}
