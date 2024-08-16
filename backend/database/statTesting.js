'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";
import { addLog, getLogsId } from './logs';

export async function getLogsIssues(){
    let connection = await connectToDB();

    const sql = 'SELECT * FROM Logs'

    try {
        const logs = await connection.query(sql);
        console.log("got all logs");
        return logs
    } catch (error) {
        console.log("Error with getting logs: ", error);
    } finally {
        connection.close();
    }
}

export async function getTags(){
    let connection = await connectToDB();

    const sql = 'SELECT * FROM Tags'

    try {
        const tags = await connection.query(sql);
        console.log("got all tags");
        return tags
    } catch (error) {
        console.log("Error with getting tags ", error);
    } finally {
        connection.close();
    }


}

export async function testAddLog({userId, title, description}){

    addLog({userId, title, description})
}