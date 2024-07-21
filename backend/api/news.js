//https://newsapi.org/v2/everything?q=health&apiKey=b19bd554de9f44e6bedcad84c279e762

'use server'

const axios = require('axios'); // Import the Axios library
//let TDKEY = process.env.NewsAPIKey ;
let key = process.env.NewsAPIKey ;

export async function getNews(){
    const url = 'https://newsapi.org/v2/everything?q=health&apiKey='+ key

    try {
        console.log(1)
        const response = await axios.get(url); // Use await to wait for the response

        if (response.status === 200) {
            console.log(2)
            const data = response.data;
            // data is successfully parsed as a JSON object:
            //console.log(data);
            return data; // Return the data
        } else {
            console.log('Status:', response.status);
            return null; // Handle the non-200 status code as needed
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for further handling
    }
}