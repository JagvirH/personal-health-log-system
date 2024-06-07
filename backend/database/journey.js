"use server"
import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";

export async function insertJourney({ logId, date, title, description }) {
    let connection = await connectToDB();

    const sql = 'INSERT INTO Journeys (logId, Date, Title, Description) VALUES (?, ?, ?, ?)';
    try {
        await connection.query(sql, [logId, date, title, description]);
        //console.log("ADDED")
    } catch (error) {
        console.log("Error with adding log: ", error);
    } finally {
        connection.close();
    }
}

export async function getJourneys({logId}){
    let connection = await connectToDB();
    const sql = 'SELECT * FROM Journeys (LogId) VALUES (?)'

    try {
        await connection.query(sql, [logId]);
        //console.log("ADDED")
    } catch (error) {
        console.log("Error with adding log: ", error);
    } finally {
        connection.close();
    }

}
