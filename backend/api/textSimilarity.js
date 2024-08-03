'use server'

import { getLogData, getLogsForTextSimilarity } from '../database/logs';


const axios = require('axios');

/*
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

*/

/*
export default async function getSimilarityRank(search) {
    const data = await getLogsForTextSimilarity();

    try {
        const response = await axios.post('http://127.0.0.1:5000/get_solutions_summary', {
            search: search,
            data: data  // Send the list of logs in the request body
        }, {
            headers: {
                'Content-Type': 'application/json'  // Ensure the header is correctly set
            }
        });

        // Access the 'log_ids' and 'instructive_summary' in the response data
        const { log_ids, instructive_summary } = response.data;

        //console.log(log_ids)
        // Create an array to store the logs
        const logs = [];

        // Iterate through each log_id and fetch the corresponding log data
        for (const log_id of log_ids) {
            const logData = await getLogData({ userId: log_id }); // Assuming getLogData expects an object with userId
            if (Array.isArray(logData)) {
                logs.push(...logData); // If logData is an array, spread it into logs
            } else {
                logs.push(logData); // If logData is a single object, push it directly
            }
        }

        //console.log(logs)

        return { logs, instructive_summary, top_tags };

    } catch (error) {
        console.error('Error fetching similarity rank and summary:', error);
        throw error;
    }
}

*/

export default async function getSimilarityRank(search) {
    const data = await getLogsForTextSimilarity();

    try {
        const response = await axios.post('http://127.0.0.1:5000/get_solutions_summary', {
            search: search,
            data: data  // Send the list of logs in the request body
        }, {
            headers: {
                'Content-Type': 'application/json'  // Ensure the header is correctly set
            }
        });

        // Access the 'log_ids', 'instructive_summary', and 'top_tags' in the response data
        const { log_ids, instructive_summary, top_tags } = response.data;

        // Create an array to store the logs
        const logs = [];

        // Iterate through each log_id and fetch the corresponding log data
        for (const log_id of log_ids) {
            const logData = await getLogData({ userId: log_id }); // Assuming getLogData expects an object with userId
            if (Array.isArray(logData)) {
                logs.push(...logData); // If logData is an array, spread it into logs
            } else {
                logs.push(logData); // If logData is a single object, push it directly
            }
        }

        return { logs, instructive_summary, top_tags };

    } catch (error) {
        console.error('Error fetching similarity rank and summary:', error);
        throw error;
    }
}



