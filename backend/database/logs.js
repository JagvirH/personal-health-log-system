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
        //console.log("Got logs");
        return logs;
    } catch (error) {
        console.log("Error with getting logs: ", error);
        return []; // Return an empty array or handle the error appropriately
    } finally {
        connection.close();
    }
}


