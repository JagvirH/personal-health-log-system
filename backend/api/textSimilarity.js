'use server'

import mysql from 'mysql2';
import { connectToDB } from "@/backend/database/mySql";

const axios = require('axios');

export default async function getResults() {
    try {
        const response = await axios.post('http://127.0.0.1:5000/text-similarity');
        return response.data.prediction;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
}