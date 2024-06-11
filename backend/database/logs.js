'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";

export async function addLog({userId, title, description}) {
    let connection = await connectToDB();

    const sql = 'INSERT INTO logs (Users_id, Title, Description, Status) VALUES (?,?,?,?)'
    const ongoing = "Ongoing"
    try {
        await connection.query(sql, [userId, title, description, ongoing])
        //console.log("ADDED")
    } catch (error) {
        console.log("Error with adding log: ", error)
    } finally {
        connection.close();
    }

}

/*
export async function getLogs({ userId }) {
    let connection = await connectToDB();
    const sql = 'SELECT * FROM logs WHERE Users_Id = ?';
    try {
        const logs = await connection.query(sql, [userId]);
        //console.log("Got logs");
        return logs;
    } catch (error) {
        console.log("Error with getting logs: ", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.close();
    }
}
*/

//import { connectToDB } from '@/backend/database/connection'; // Adjust the import path according to your project structure

//import { connectToDB } from '@/backend/database/connection'; // Adjust the import path according to your project structure

export async function getLogs({ userId }) {
    let connection = await connectToDB();
    const sql = `
        SELECT 
            Logs.Id AS logId, 
            Logs.Title AS logTitle, 
            Logs.Description AS logDescription, 
            Tags.Id AS tagId, 
            Tags.Title AS tagTitle 
        FROM Logs 
        LEFT JOIN Log_Tags ON Logs.Id = Log_Tags.LogId 
        LEFT JOIN Tags ON Log_Tags.TagId = Tags.Id 
        WHERE Logs.Users_Id = ?
    `;
    try {
        const [rows] = await connection.query(sql, [userId]);
        const logsMap = {};

        rows.forEach(row => {
            if (!logsMap[row.logId]) {
                logsMap[row.logId] = {
                    id: row.logId,
                    title: row.logTitle,
                    description: row.logDescription,
                    tags: []
                };
            }
            if (row.tagId) {
                logsMap[row.logId].tags.push({ id: row.tagId, title: row.tagTitle });
            }
        });

        const logs = Object.values(logsMap);
        return logs;
    } catch (error) {
        console.log("Error with getting logs: ", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.close();
    }
}


export async function updateDescription({}) {

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
/*
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
*/

export async function getlog(logId) {
    let connection;

    try {
        connection = await connectToDB();
        
        // Query to get the log along with its associated tags
        const sql = `
            SELECT 
                Logs.Id AS logId, 
                Logs.Users_Id AS userId, 
                Logs.Title AS logTitle, 
                Logs.Description AS logDescription, 
                Logs.Status AS logStatus,
                Tags.Id AS tagId, 
                Tags.Title AS tagTitle
            FROM Logs 
            LEFT JOIN Log_Tags ON Logs.Id = Log_Tags.LogId 
            LEFT JOIN Tags ON Log_Tags.TagId = Tags.Id 
            WHERE Logs.Id = ?
        `;
        
        const [results] = await connection.execute(sql, [logId]);

        if (results.length === 0) {
            return null; // No log found
        }

        console.log("Here -->"  + results[0].logStatus)

        // Extract log details and tags
        const logDetails = {
            Id: results[0].logId,
            Users_Id: results[0].userId,
            Title: results[0].logTitle,
            Description: results[0].logDescription,
            
            Tags: results.map(row => ({ Id: row.tagId, Title: row.tagTitle })).filter(tag => tag.Id !== null), // Filter out null tags
            Status: results[0].logStatus,
        };

        return logDetails;
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

export async function editLogDescription({Id, Description, Status}) {
    let connection = await connectToDB();
    const sql = `UPDATE Logs SET Description = ?, Status = ? WHERE Id = ?`;

    // Log the SQL statement and parameters for debugging
    console.log("SQL Query:", sql);
    console.log("Parameters:", [Description, Status, Id]);

    try {
        // Ensure proper parameter substitution
        await connection.query(sql, [Description, Status, Id]);
        console.log("Changed");
    } catch (error) {
        console.log("Error with updating log: ", error);
    } finally {
        connection.close();
    }
}


export async function getLogsId({ userId, title, description }) {
    let connection;
    try {
        connection = await connectToDB();
        const sql = `SELECT * FROM Logs WHERE Users_Id = ? AND Title = ? AND Description = ?`;
        const check = [userId, title, description];

        const [rows] = await connection.query(sql, check);
        console.log("HERE --", rows);  // Logs the array of objects directly

        return rows;  // Assuming you want to return all matching logs
    } catch (error) {
        console.log("Error with fetching logs: ", error);
    } finally {
        if (connection) {
            await connection.end();  // Ensures the connection is closed properly
        }
    }
}




/*

export async function getLogsId({userId,title, description }){
    let connection = await connectToDB();
    const sql = `SELECT * FROM Logs WHERE Users_Id = ? and Title = ? and Description = ?`;

    const check = [userId,title, description]
    try {
        const logId = await connection.query(sql, check );
        console.log("HERE --" +logId)
        return logId[0];
    } catch (error) {
        console.log("Error with updating log: ", error);
    } finally {
        connection.close();
    }

}
*/

