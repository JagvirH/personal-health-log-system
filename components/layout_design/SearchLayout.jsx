import React, { useEffect, useState } from 'react';
import getSimilarityRank from '@/backend/api/textSimilarity';
import LogRankCard from '../Cards/LogRankCard';
import { getLogData, getlog } from '@/backend/database/logs';

export function SearchLayout({ searchTerm }) {
    const [rankedLogs, setRankedLogs] = useState([]);
    const [summary, setSummary] = useState('');

    

    useEffect(() => {
        const fetchRankedLogs = async () => {
            if (searchTerm) {
                try {
                    const results = await getSimilarityRank(searchTerm);
                    setRankedLogs(results.log_ids);  // If you need to use log_ids
                    setSummary(results.instructive_summary);  // Set the instructive summary
                    console.log(results.log_ids);
                    console.log(results.instructive_summary);
                    console.log("----------")
                    const userId = results.log_ids[0]
                    //console.log()

                    //const y = await getlog(userId)
                    //console.log("HERE" + y)
                    const x = await getLogData({ userId });
                    
                    
                    console.log(x)
                } catch (error) {
                    console.error('Error fetching ranked logs:', error);
                }
            }
        };

        fetchRankedLogs();
    }, [searchTerm]);


    

    
        if (searchTerm) {
            return (<div className='flex flex-row p-2'>
            <div className='w-1/3'>
                <div>
                    Advised Sumamry:
                </div>

                <div className='border-grey bg-white'>
                    <div className=''>
                        {summary && <p>{summary}</p>}
                    </div>
                    
                </div>
                
            </div>
            
            <div className="flex flex-wrap">
                
            </div>
        </div>
    );
        }
        
}

export default SearchLayout;
