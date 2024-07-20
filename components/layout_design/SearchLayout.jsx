import React, { useEffect, useState } from 'react';
import getSimilarityRank from '@/backend/api/textSimilarity';
import LogRankCard from '../Cards/LogRankCard';
import LogSimilarCard from '../Cards/LogSimilarCard';
import { getLogData, getlog } from '@/backend/database/logs';

export function SearchLayout({ searchTerm }) {
    const [rankedLogs, setRankedLogs] = useState([]);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        const fetchRankedLogs = async () => {
            if (searchTerm) {
                try {
                    const results = await getSimilarityRank(searchTerm);
                    setRankedLogs(results.logs);  // Set the ranked logs
                    setSummary(results.instructive_summary);  // Set the instructive summary
                } catch (error) {
                    console.error('Error fetching ranked logs:', error);
                }
            }
        };

        fetchRankedLogs();
    }, [searchTerm]);

    if (searchTerm) {
        return (
            <div className='flex flex-row p-2'>
                <div className='w-1/3'>
                    <div>Advised Summary:</div>
                    <div className='border-grey bg-white'>
                        <div>{summary && <p>{summary}</p>}</div>
                    </div>
                </div>
                <div className="h-96 overflow-y-scroll w-2/3 p-2">
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {rankedLogs.map((log, index) => (
                        <div key={index} className="w-full p-2 border-b border-gray-300">
                            <LogSimilarCard logData={log} />
                        </div>
                        ))}
                    </div>
                </div>

                

            </div>
        );
    }

    return null;
}

export default SearchLayout;
