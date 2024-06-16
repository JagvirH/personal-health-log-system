'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";
import { getLogsId } from './logs';

export async function getTag() {
    let connection = await connectToDB();

    const sql = 'SELECT * FROM Tags'

    try {
        // Execute the SQL statement with the provided values
        const [tagList, metadata] = await connection.query(sql);
        //console.log('Got Tags');
        return tagList
    } catch (error) {
        console.error('Error getting tags', error);
    } finally {
        // Close the database connection
        connection.close();
    }
}

export async function addTags({ userId, title, description, tags }) {
    let connection;
    try {
        connection = await connectToDB();

        const [log] = await getLogsId({ userId, title, description });
        //console.log(log[0])
        console.log("HERE")
        if (log) {
            const logId = log.Id;  // Assuming the log object has an 'Id' field
            console.log("HERE IS THE NEW ID:  ---> " + logId);

            const sql = 'INSERT INTO Log_Tags (LogId, TagId) VALUES (?, ?)';

            for (const tagId of tags) {
                await connection.query(sql, [logId, tagId]);
            }
            console.log("Tags successfully added to Log_Tags.");
        } else {
            console.log("No log found matching the provided criteria.");
        }
    } catch (error) {
        console.error("An error occurred while adding tags:", error);
    } finally {
        if (connection) {
            connection.end();
        }
    }
}



export async function getTagLabel({Id}){
    let connection = await connectToDB();
    const sql = "SELECT * FROM Tags WHERE Id = ?"

    try {
        // Execute the SQL statement with the provided values
        const [tagList] = await connection.query(sql, Id);
        //console.log('Got Tags');
        return tagList
    } catch (error) {
        console.error('Error getting tags', error);
    } finally {
        // Close the database connection
        connection.close();
    }
}

export async function deleteTags({Id, tagId}){

    let connection = await connectToDB();

    console.log(tagId)

    const sql ="DELETE FROM log_Tags WHERE logId = ? AND tagId = ?"
    const check = [Id, tagId]
    try {
        // Execute the SQL statement with the provided values
        await connection.query(sql, check);
        //console.log('Got Tags');
        //return tagList
    } catch (error) {
        console.error('Error getting tags', error);
    } finally {
        // Close the database connection
        connection.close();
    }

}

export async function addlogTags({Id, tagId}) {

    let connection = await connectToDB();

    console.log(tagId)

    const sql ="INSERT INTO log_Tags (logId, tagId) VALUES (?, ?)"
    const check = [Id, tagId]
    try {
        // Execute the SQL statement with the provided values
        await connection.query(sql, check);
        //console.log('Got Tags');
        //return tagList
    } catch (error) {
        console.error('Error getting tags', error);
    } finally {
        // Close the database connection
        connection.close();
    }

}









