'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";

export async function addLog({userId, title, description}) {
    let connection = await connectToDB();

    const sql = 'INSERT INTO logs (Users_id, Title, Description) VALUES (?,?,?)'
    
    try {
        await connection.query(sql, [userId, title, description])
        console.log("ADDED")
    } catch (error) {
        console.log("Error with adding log: ", error)
    } finally {
        connection.close();
    }

}

export async function getLogs({ userId }) {
    let connection = await connectToDB();
    const sql = 'SELECT * FROM logs WHERE Users_Id = ?';
    try {
        const logs = await connection.query(sql, [userId]);
        console.log("Got logs");
        return logs;
    } catch (error) {
        console.log("Error with getting logs: ", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.close();
    }
}

export async function checkIfUsersLog({ userId, logId }) {
    let connection = await connectToDB();

    const sql = `SELECT COUNT(*) as count FROM Logs WHERE Id = ? AND Users_Id = ?`;

    const params = [logId, userId];

    try {
        const [rows] = await connection.query(sql, params);
        const count = rows[0].count;
        return count > 0 ? true : false;
    } catch (error) {
        console.error("Error checking users log:", error);
        return false;
    } finally {
        // Close the database connection
        connection.end();
    }
}

export async function getlog(logId) { 
    let connection;

    try {
        connection = await connectToDB();
        const sql = 'SELECT * FROM Logs WHERE Id = ?';
        
        const [results] = await connection.execute(sql, [logId]); // Use execute for parameterized queries

        if (results.length === 0) {
            return null; // No log found
        }

        return results[0]; // Assuming you want to return the single log entry
    } catch (error) {
        console.error("Error getting log:", error);
        return false;
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

export async function getLogsForTextSimilarity() {
    let connection = await connectToDB();
    const sql = `SELECT * FROM Logs`;

    try {
        const [rows] = await connection.query(sql);
        const logs = rows.map(row => ({
            id: row.Id,
            title: row.Title,
            description: row.Description
        }));
        //console.log(logs);
        return logs;
    } catch (error) {
        console.log("Error with getting logs: ", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.close();
    }
    

}



