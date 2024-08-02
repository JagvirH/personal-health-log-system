'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";
import { getLogsId } from './logs';

export async function getLogsIssues(){
    let connection = await connectToDB();

    const sql = 'SELECT * FROM'
}