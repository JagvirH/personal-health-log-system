"use client"

import { testAddLog, testDeleteLog, addTagsToLog } from '@/backend/database/statTesting';
import React, { useState } from 'react';

const Page = () => {
    const [createdLogIds, setCreatedLogIds] = useState([]);

    // Array of logs data
    const x = [
        [1, "test1", "test1"], // First log data
        [1, "Hello", "test1"]  // Second log data
    ];

    // Array of tags for corresponding logs
    const y = [
        [1, 2, 3], // Tags for the first log
        [1, 2]     // Tags for the second log
    ];

    // Handlers for the buttons
    const handleAddClick1 = async () => {
        console.log('Adding logs');
        const newLogIds = [];
        
        // Add logs and get their IDs
        for (let i = 0; i < x.length; i++) {
            const [userId, title, description] = x[i];
            const tags = y[i];

            try {
                // Add the log and get its ID
                const logId = await testAddLog({ userId, title, description });
                newLogIds.push(logId);

                // Add the associated tags for this log
                if (logId && tags) {
                    await addTagsToLog(logId, tags);
                }
            } catch (error) {
                console.error("Error adding log or tags:", error);
            }
        }

        // Store the created log IDs in state
        setCreatedLogIds(newLogIds);
    };

    const handleRemoveClick1 = () => {
        console.log('Removing logs');
        const id = "1";
        testDeleteLog({ id });
    };

    return (
        <div>
            <div>
                Test 1
                <div>
                    <div className='blue_button' onClick={handleAddClick1}>
                        add
                    </div>
                </div>
                <div>
                    <div className='blue_button' onClick={handleRemoveClick1}>
                        remove
                    </div>
                </div>
            </div>
            <div>
                <h3>Created Log IDs:</h3>
                <ul>
                    {createdLogIds.map(id => (
                        <li key={id}>{id}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Page;
