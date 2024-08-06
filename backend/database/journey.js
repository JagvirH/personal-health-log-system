"use server"
import mysql from 'mysql2/promise';
import { connectToDB } from "@/backend/database/mySql";

export async function insertJourney({ logId, date, title, description }) {
    let connection = await connectToDB();

    const sql = 'INSERT INTO Journeys (LogId, Date, Title, Description) VALUES (?, ?, ?, ?)';
    try {
        await connection.execute(sql, [logId, date, title, description]);
    } catch (error) {
        console.error("Error with adding log:", error);
    } finally {
        connection.end();
    }
}

export async function getJourneys({ logId }) {
    let connection = await connectToDB();
    const sql = 'SELECT * FROM Journeys WHERE LogId = ?';

    try {
        const [results] = await connection.execute(sql, [logId]);
        return results;
    } catch (error) {
        console.error("Error fetching journeys:", error);
        return [];
    } finally {
        connection.end();
    }
}

export async function deleteJourney({ logId, journeyId }) {
    let connection = await connectToDB();

    const sql = 'DELETE FROM Journeys WHERE LogId = ? AND Id = ?';
    try {
        await connection.execute(sql, [logId, journeyId]);
    } catch (error) {
        console.error("Error deleting journey:", error);
    } finally {
        connection.end();
    }
}
