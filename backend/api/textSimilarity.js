'use server'

import { getLogsForTextSimilarity } from '../database/logs';

const axios = require('axios');

export default async function getSimilarityRank(search) {

    const data = await getLogsForTextSimilarity()
    //console.log(data)
    try {
        const response = await axios.post('http://127.0.0.1:5000/hello', {
            search: search,
            data: data  // Send the list of names in the request body
        }, {
            headers: {
                'Content-Type': 'application/json'  // Ensure the header is correctly set
            }
        });
        //console.log(response.data); // Log the entire response object
        return response.data; // Access the 'greetings' key in the response data
    } catch (error) {
        console.error('Error fetching personalized greetings:', error);
        throw error;
    }
}
