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

// Function to add tags to a log
export async function testAddTagsToLog(logId, tagIds) {
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

// Function to add solutions to a log
export async function testAddSolutionsToLog(logId, solutions) {
    let connection = await connectToDB();
    const sql = `INSERT INTO Solutions (LogId, Solution) VALUES (?, ?);`;

    try {
        for (const solution of solutions) {
            await connection.query(sql, [logId, solution]);
        }
    } catch (error) {
        console.log("Error adding solutions: ", error);
        throw error;
    } finally {
        connection.close();
    }
}

export async function testAddOpinionToLog(logId, opinions) {
    let connection = await connectToDB();
    const sql = `INSERT INTO Opinions (LogId, Description, WhoId) VALUES (?, ?, ?);`;

    try {
        for (const [description, whoId] of opinions) {
            await connection.query(sql, [logId, description, whoId]);
        }
    } catch (error) {
        console.log("Error adding opinions: ", error);
        throw error;
    } finally {
        connection.close();
    }
}

// Function to delete a log
export async function testDeleteLog({ id }) {
    let connection = await connectToDB();
    const sql = `DELETE FROM Logs WHERE Users_Id = ?;`;

    try {
        await connection.query(sql, [id]);
        console.log("Log deleted");
    } catch (error) {
        console.log("Error deleting log: ", error);
    } finally {
        connection.close();
    }
}
