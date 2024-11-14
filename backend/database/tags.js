"use server";
import { connectToDB } from "@/backend/database/postgres"; // Connect to PostgreSQL
import { getLogsId } from './logs';

export async function getTag() {
    const connection = await connectToDB(); // Keep variable name `connection`

    const sql = 'SELECT * FROM tags';

    try {
        // Execute the SQL statement
        const { rows: tagList } = await connection.query(sql);
        return tagList;
    } catch (error) {
        console.error('Error getting tags:', error);
    } finally {
        // Close the database connection
        connection.end();
    }
}

export async function addTags({ userId, title, description, tags }) {
    let connection;
    try {
        connection = await connectToDB(); // Keep variable name `connection`

        const [log] = await getLogsId({ userId, title, description });
        
        if (log) {
            const logId = log.id; // Assuming the log object has an 'id' field (in lowercase for PostgreSQL)

            const sql = 'INSERT INTO log_tags (logid, tagid) VALUES ($1, $2)';

            for (const tagId of tags) {
                await connection.query(sql, [logId, tagId]);
            }
            console.log("Tags successfully added to log_tags.");
        } else {
            console.log("No log found matching the provided criteria.");
        }
    } catch (error) {
        console.error("An error occurred while adding tags:", error);
    } finally {
        if (connection) {
            connection.end();
        }
    }
}


export async function deleteTags({ Id, tagId }) {
    const connection = await connectToDB(); // Keep variable name `connection`

    const sql = "DELETE FROM log_tags WHERE logid = $1 AND tagid = $2";
    const check = [Id, tagId];
    try {
        // Execute the SQL statement with the provided values
        await connection.query(sql, check);
        console.log("Tags deleted from log_tags.");
    } catch (error) {
        console.error("Error deleting tags:", error);
    } finally {
        // Close the database connection
        connection.end();
    }
}

export async function addlogTags({ Id, tagId }) {
    const connection = await connectToDB(); // Keep variable name `connection`

    const sql = "INSERT INTO log_tags (logid, tagid) VALUES ($1, $2)";
    const check = [Id, tagId];
    try {
        // Execute the SQL statement with the provided values
        await connection.query(sql, check);
        console.log("Tags added to log_tags.");
    } catch (error) {
        console.error("Error adding tags:", error);
    } finally {
        // Close the database connection
        connection.end();
    }
}









