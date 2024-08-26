'use server'
import axios from 'axios';

// Function to fetch tag percentages from the Flask API
export async function getTagPercentages() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/get_tag_percentage');
        return response.data;  // Returns an array of tag percentages
    } catch (error) {
        console.error('Error fetching tag percentages:', error);
        throw error;
    }
}
