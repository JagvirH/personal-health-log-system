"use server";

import { connectToDB } from "@/backend/database/postgres"; // PostgreSQL connection file

export async function addLog({ userId, title, description }) {
    const connection = await connectToDB(); // Keep variable name `connection`

    const sql = 'INSERT INTO logs (users_id, title, description, status, bookmark, share) VALUES ($1, $2, $3, $4, $5, $6)';
    const ongoing = "Ongoing";

    try {
        await connection.query(sql, [userId, title, description, ongoing, false, false]);
        // console.log("ADDED")
    } catch (error) {
        console.log("Error with adding log:", error);
    } finally {
        connection.end(); // Close connection
    }
}

export async function getLogs({ userId }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    
    const sql = `
        SELECT 
            logs.id AS logId, 
            logs.title AS logTitle, 
            logs.description AS logDescription, 
            logs.bookmark AS logBookmark,
            tags.id AS tagId, 
            tags.title AS tagTitle,
            tags.type AS tagType
        FROM logs 
        LEFT JOIN log_tags ON logs.id = log_tags.logid 
        LEFT JOIN tags ON log_tags.tagid = tags.id 
        WHERE logs.users_id = $1
    `;

    try {
        const { rows } = await connection.query(sql, [userId]);
        const logsMap = {};

        rows.forEach(row => {
            if (!logsMap[row.logId]) {
                logsMap[row.logId] = {
                    id: row.logId,
                    title: row.logTitle,
                    description: row.logDescription,
                    tags: [],
                    bookmark: row.logBookmark,
                };
            }
            if (row.tagId) {
                logsMap[row.logId].tags.push({ id: row.tagId, title: row.tagTitle, type: row.tagType });
            }
        });

        const logs = Object.values(logsMap);
        return logs;
    } catch (error) {
        console.log("Error with getting logs:", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.end();
    }
}

export async function checkIfUsersLog({ userId, logId }) {
    const connection = await connectToDB(); // Keep variable name `connection`

    const sql = `SELECT COUNT(*) as count FROM logs WHERE id = $1 AND users_id = $2`;
    const params = [logId, userId];

    try {
        const { rows } = await connection.query(sql, params);
        const count = rows[0].count;
        return count > 0; // Returns true if count > 0, otherwise false
    } catch (error) {
        console.error("Error checking users log:", error);
        return false;
    } finally {
        connection.end(); // Close the database connection
    }
}

export async function getlog(logId) {
    let connection;

    try {
        connection = await connectToDB();
        
        // Query to get the log along with its associated tags
        const sql = `
            SELECT 
                logs.id AS logId, 
                logs.users_id AS userId, 
                logs.title AS logTitle, 
                logs.description AS logDescription, 
                logs.status AS logStatus,
                logs.bookmark AS logBookmark,
                logs.share AS logShare,
                tags.id AS tagId, 
                tags.title AS tagTitle,
                tags.type AS tagType
            FROM logs 
            LEFT JOIN log_tags ON logs.id = log_tags.logid 
            LEFT JOIN tags ON log_tags.tagid = tags.id 
            WHERE logs.id = $1
        `;
        
        const { rows: results } = await connection.query(sql, [logId]);

        if (results.length === 0) {
            return null; // No log found
        }

        console.log("Here -->"  + results[0].logStatus);

        // Extract log details and tags
        const logDetails = {
            Id: results[0].logId,
            Users_Id: results[0].userId,
            Title: results[0].logTitle,
            Description: results[0].logDescription,
            Tags: results.map(row => ({ Id: row.tagId, Title: row.tagTitle, type: row.tagType })).filter(tag => tag.Id !== null), // Filter out null tags
            Status: results[0].logStatus,
            Bookmark: results[0].logBookmark,
            Share: results[0].logShare,
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
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `SELECT * FROM logs`;

    try {
        const { rows } = await connection.query(sql);
        const logs = rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description
        }));
        // console.log(logs);
        return logs;
    } catch (error) {
        console.log("Error with getting logs:", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.end();
    }
}

export async function editLogDescription({ Id, Description, Status, Share }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `UPDATE logs SET description = $1, status = $2, share = $3 WHERE id = $4`;

    try {
        await connection.query(sql, [Description, Status, Share, Id]);
        console.log("Changed");
    } catch (error) {
        console.log("Error with updating log:", error);
    } finally {
        connection.end();
    }
}

export async function getLogsId({ userId, title, description }) {
    let connection;
    try {
        connection = await connectToDB(); // Keep variable name `connection`
        const sql = `SELECT * FROM logs WHERE users_id = $1 AND title = $2 AND description = $3`;
        const check = [userId, title, description];

        const { rows } = await connection.query(sql, check);
        console.log("HERE --", rows); // Logs the array of objects directly

        return rows; // Assuming you want to return all matching logs
    } catch (error) {
        console.log("Error with fetching logs:", error);
    } finally {
        if (connection) {
            await connection.end(); // Ensures the connection is closed properly
        }
    }
}

export async function deleteLog({ logId }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `DELETE FROM logs WHERE id = $1`;

    try {
        await connection.query(sql, [logId]);
        console.log("Changed");
    } catch (error) {
        console.log("Error with deleting log:", error);
    } finally {
        connection.end();
    }
}


export async function toggleBookmark({ logId, bookmark }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `UPDATE logs SET bookmark = $1 WHERE id = $2`;

    try {
        await connection.query(sql, [bookmark, logId]);
        console.log("Bookmark updated");
    } catch (error) {
        console.log("Error with updating bookmark:", error);
    } finally {
        connection.end();
    }
}

export async function getBookmarkedLogs({ userId }) {
    let connection;
    try {
        connection = await connectToDB(); // Keep variable name `connection`

        const sql = `SELECT * FROM logs WHERE users_id = $1 AND bookmark = $2`;
        const check = [userId, true]; // Assuming `bookmark` is a boolean in PostgreSQL

        const { rows } = await connection.query(sql, check);
        // console.log("HERE --", rows); // Logs the array of objects directly

        return rows; // Returning all matching logs
    } catch (error) {
        console.log("Error with fetching logs:", error);
    } finally {
        if (connection) {
            await connection.end(); // Ensures the connection is closed properly
        }
    }
}

export async function getLogData({ userId }) {
    const connection = await connectToDB(); // Keep variable name `connection`
    const sql = `
        SELECT 
            logs.id AS logId, 
            logs.title AS logTitle, 
            logs.description AS logDescription, 
            logs.bookmark AS logBookmark,
            tags.id AS tagId, 
            tags.title AS tagTitle,
            opinions.description AS opinionDescription,
            opinions.whoid AS opinionWhoId,
            who.title AS whoName,
            solutions.solution AS solution
        FROM logs 
        LEFT JOIN log_tags ON logs.id = log_tags.logid 
        LEFT JOIN tags ON log_tags.tagid = tags.id 
        LEFT JOIN opinions ON logs.id = opinions.logid
        LEFT JOIN who ON opinions.whoid = who.id
        LEFT JOIN solutions ON logs.id = solutions.logid
        WHERE logs.users_id = $1
    `;

    try {
        const { rows } = await connection.query(sql, [userId]);
        const logsMap = {};

        rows.forEach(row => {
            if (!logsMap[row.logId]) {
                logsMap[row.logId] = {
                    id: row.logId,
                    title: row.logTitle,
                    description: row.logDescription,
                    tags: [],
                    bookmark: row.logBookmark,
                    opinion: row.opinionDescription ? { description: row.opinionDescription, who: row.whoName } : null,
                    solution: row.solution || null
                };
            }
            if (row.tagId) {
                logsMap[row.logId].tags.push({ id: row.tagId, title: row.tagTitle });
            }
        });

        const logs = Object.values(logsMap);
        // console.log(logs);
        return logs;
    } catch (error) {
        console.log("Error with getting logs:", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.end();
    }
}

