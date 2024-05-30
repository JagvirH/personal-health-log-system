'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";
import { getLogsId } from './logs';

export async function getTag() {
    let connection = await connectToDB();

    const sql = 'SELECT * FROM Tags'

    try {
        // Execute the SQL statement with the provided values
        const [tagList, metadata] = await connection.query(sql);
        //console.log('Got Tags');
        return tagList
    } catch (error) {
        console.error('Error getting tags', error);
    } finally {
        // Close the database connection
        connection.close();
    }
}

export async function addTags({ userId, title, description, tags }) {
    let connection = await connectToDB();

    const [log] = await getLogsId({ userId, title, description });

    if (log) {
        const logId = log.Id;  // Assuming the log object has an 'Id' field
        console.log("HERE IS THE NEW ID:  ---> " + logId);
    } else {
        console.log("No log found matching the provided criteria.");
    }

    const sql = 'SELECT * FROM Tags';
    // Execute the query to fetch tags and any additional logic
}

