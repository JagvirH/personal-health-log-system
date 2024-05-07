'use server'

import mysql from 'mysql2';
import { connectToDB } from "../mySql";

export async function getTag() {
    let connection = await connectToDB();

    const sql = 'SELECT * FROM Tags'

    try {
        // Execute the SQL statement with the provided values
        await connection.query(sql);
        console.log('Got Tags');
    } catch (error) {
        console.error('Error getting tags', error);
    } finally {
        // Close the database connection
        connection.close();
    }
}