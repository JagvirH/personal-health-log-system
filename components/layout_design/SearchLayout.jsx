import React, { useEffect, useState } from 'react';
import getSimilarityRank from '@/backend/api/textSimilarity';
import LogRankCard from '../Cards/LogRankCard';

export function SearchLayout({ searchTerm }) {
    const [rankedLogs, setRankedLogs] = useState([]);

    useEffect(() => {
        const fetchRankedLogs = async () => {
            if (searchTerm) {
                try {
                    const results = await getSimilarityRank(searchTerm);
                    //setRankedLogs(logs);
                    console.log(results.log_ids)
                    console.log(results.instructive_summary)
                    //const advise = results.instructive_summary
                } catch (error) {
                    console.error('Error fetching ranked logs:', error);
                }
            }
        };

        fetchRankedLogs();
    }, [searchTerm]);


    return(
        <div>
            
        </div>
    )

    /*
    return (
        <div className="flex flex-wrap ">
            <div className='bg-[green]'></div>
            {rankedLogs.map((log, index) => (
                <div 
                    key={index} 
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 log_card"
                >
                    <LogRankCard 
                        title={log.title} 
                        id={log.id} 
                        description={log.description} 
                        similarity={log.similarity} 
                    />
                </div>
            ))}
        </div>
    );
    */
}

export default SearchLayout;
