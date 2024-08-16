'use server'

import mysql from 'mysql2/promise';
import { connectToDB } from "@/backend/database/mySql";

// Existing function to add logs
export async function testAddLog({ userId, title, description }) {
    let connection = await connectToDB();
    const sql = `INSERT INTO Logs (Users_Id, Title, Description, Status, Bookmark, Share) VALUES (?, ?, ?, 'Ongoing', false, false);`;

    try {
        const [result] = await connection.query(sql, [userId, title, description]);
        return result.insertId;
    } catch (error) {
        console.log("Error adding log: ", error);
        throw error;
    } finally {
        connection.close();
    }
}

// New function to add tags to a log
export async function addTagsToLog(logId, tagIds) {
    let connection = await connectToDB();
    const sql = `INSERT INTO Log_Tags (LogId, TagId) VALUES (?, ?);`;

    try {
        for (const tagId of tagIds) {
            await connection.query(sql, [logId, tagId]);
        }
    } catch (error) {
        console.log("Error adding tags: ", error);
        throw error;
    } finally {
        connection.close();
    }
}



export async function testDeleteLog({id}){
    let connection = await connectToDB();
    const sql = `DELETE FROM Logs WHERE Users_Id = ?;`;

    try {
        // Ensure proper parameter substitution
        await connection.query(sql, id);
        console.log("Changed");
    } catch (error) {
        console.log("Error with updating log: ", error);
    } finally {
        connection.close();
    }
}



/*
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
*/