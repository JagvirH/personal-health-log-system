"use server"
import mysql from 'mysql2/promise';
import { connectToDB } from "@/backend/database/mySql";

export async function getSolution({ logId }) {
    //console.log(logId)
    let connection = await connectToDB();
    const query = 'SELECT * FROM Solutions WHERE LogId = ?';

    try {
        const [rows] = await connection.execute(query, [logId]);
        
        if (rows.length === 0) {
            
            return "";
        } else {
            //console.log(rows[])
            return rows[0].Solution; // Assuming the solution is in a column named 'solution'
        }
    } catch (error) {
        console.error("Error fetching solution:", error);
        return "";
    } finally {
        connection.end();
    }
}



export async function insertOrUpdateSolution({logId,  solution }) {
    let connection = await connectToDB();
    const selectSql = 'SELECT * FROM Solutions WHERE LogId = ?';
    const insertSql = 'INSERT INTO Solutions (LogId, Solution) VALUES ( ?, ?)';
    const updateSql = 'UPDATE Solutions SET Solution = ? WHERE LogId = ?';

    try {
        const [results] = await connection.execute(selectSql, [logId]);
        if (results.length > 0) {

            const logId2 = parseInt(logId, 10);

            await connection.execute(updateSql, [ solution, logId2]);
        } else {
            // Insert new opinion
            await connection.execute(insertSql, [logId, solution]);
        }
    } catch (error) {
        console.error("Error inserting or updating opinion:", error);
    } finally {
        connection.end();
    }
}