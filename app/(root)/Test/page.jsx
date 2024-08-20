"use client"

import { testAddLog, testDeleteLog, testAddTagsToLog, testAddSolutionsToLog, testAddOpinionToLog } from '@/backend/database/statTesting';
import React, { useState } from 'react';

const Page = () => {
    const [createdLogIds, setCreatedLogIds] = useState([]);

    // Array of logs data
    const logs = [
        [1, "test1", "test1"], // First log data
        [1, "Hello", "test1"]  // Second log data
    ];

    // Array of tags for corresponding logs
    const logTags = [
        [1, 2, 3], // Tags for the first log
        [1, 2]     // Tags for the second log
    ];

    const logSolution = [
        ['smfr'],  // Solution for the first log
        ['wrgberj'] // Solution for the second log
    ];

    const logOpinion = [
        [['sefwf', 1]],   // Opinions for the first log
        [['wefwef', 1]]   // Opinions for the second log
    ];

    // Handlers for the buttons
    const handleAddClick1 = async () => {
        console.log('Adding logs');
        const newLogIds = [];
        
        // Add logs and get their IDs
        for (let i = 0; i < logs.length; i++) {
            const [userId, title, description] = logs[i];
            const tags = logTags[i];
            const solutions = logSolution[i];
            const opinions = logOpinion[i];

            try {
                // Add the log and get its ID
                const logId = await testAddLog({ userId, title, description });
                newLogIds.push(logId);

                // Add the associated tags for this log
                if (logId && tags) {
                    await testAddTagsToLog(logId, tags);
                }

                // Add the associated solutions for this log
                if (logId && solutions) {
                    await testAddSolutionsToLog(logId, solutions);
                }

                // Add the associated opinions for this log
                if (logId && opinions) {
                    await testAddOpinionToLog(logId, opinions);
                }

            } catch (error) {
                console.error("Error adding log, tags, solutions, or opinions:", error);
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
