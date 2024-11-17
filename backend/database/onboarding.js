'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";

export async function test1({checkId}) {
    console.log("here down")
    console.log(checkId)

}

export async function addUser({ userId, userName, userEmail }) {
    let connection = await connectToDB(); // Connect to the database

    // SQL statement to insert data into the Users table
    const sql = `INSERT INTO Users (Id, Name,Email) VALUES (?, ?, ?)`;

    try {
        // Execute the SQL statement with the provided values
        await connection.query(sql, [userId, userName, userEmail]);
        console.log('User added successfully');
    } catch (error) {
        console.error('Error adding user:', error);
    } finally {
        // Close the database connection
        connection.close();
    }
}

export async function checkUser({ userId }) {
    let connection = await connectToDB(); // Connect to the database

    const sql = 'SELECT id FROM Users WHERE Id = ?'; // SQL query to select id based on userId

    try {
        // Execute the SQL query with the provided userId
        const [rows, fields] = await connection.query(sql, [userId]);

        // Check if any rows were returned
        if (rows.length > 0) {
            // User exists
            console.log("user exists")
            return true;
        } else {
            // User does not exist
            console.log("new user")
            return false;
        }
    } catch (error) {
        console.error('Error checking user:', error);
        // Return false if an error occurs
        return false;
    } finally {
        // Close the database connection
        connection.close();
    }
}