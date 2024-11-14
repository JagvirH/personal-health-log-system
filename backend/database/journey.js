"use server";
import { connectToDB } from "@/backend/database/postgres"; // Adjust path if needed

export async function insertJourney({ logId, date, title, description }) {
    const client = await connectToDB();

    const sql = 'INSERT INTO journeys (logid, date, title, description) VALUES ($1, $2, $3, $4)';
    try {
        await client.query(sql, [logId, date, title, description]);
    } catch (error) {
        console.error("Error with adding journey:", error);
    } finally {
        client.end();
    }
}

export async function getJourneys({ logId }) {
    const client = await connectToDB();
    const sql = 'SELECT * FROM journeys WHERE logid = $1';

    try {
        const { rows } = await client.query(sql, [logId]);
        return rows;
    } catch (error) {
        console.error("Error fetching journeys:", error);
        return [];
    } finally {
        client.end();
    }
}

export async function deleteJourney({ logId, journeyId }) {
    const client = await connectToDB();

    const sql = 'DELETE FROM journeys WHERE logid = $1 AND id = $2';
    try {
        await client.query(sql, [logId, journeyId]);
    } catch (error) {
        console.error("Error deleting journey:", error);
    } finally {
        client.end();
    }
}
