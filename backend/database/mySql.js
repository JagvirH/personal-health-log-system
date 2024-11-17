"use server"

import mysql from 'mysql2/promise'; // Import promise-based API

let connection = null;

export const connectToDB = async () => {
    if (!process.env.host) throw new Error('MySQL host not found');
    if (!process.env.password) throw new Error('MySQL password not found');

    try {
        connection = await mysql.createConnection({ 
            host: process.env.host,   
            user: 'root',                  
            password: process.env.password,  
            database: 'personal_health_log', 
            port: 3306,                    
        });

        console.log('Connected to MySQL schema');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }

    return connection;
};



/*
import mysql from 'mysql2/promise'; // Import promise-based API

let connection = null;

export const connectToDB = async () => {
    if (!process.env.host) throw new Error('MySQL host not found');
    if (!process.env.password) throw new Error('MySQL password not found');

    try {
        connection = await mysql.createConnection({ 
            host: process.env.host,
            user: 'root',
            password: process.env.password,
            database: 'personal_health_log',
        });

        console.log('Connected to MySQL schema');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }

    return connection;
};
*/