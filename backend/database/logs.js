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

