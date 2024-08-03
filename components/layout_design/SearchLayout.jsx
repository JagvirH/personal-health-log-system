import React, { useEffect, useState } from 'react';
import getSimilarityRank from '@/backend/api/textSimilarity';
import LogRankCard from '../Cards/LogRankCard';
import LogSimilarCard from '../Cards/LogSimilarCard';
import { getLogData, getlog } from '@/backend/database/logs';
import Modal from '../Popup/Modal';
import LogModalCard from '../Cards/LogModalCard';

export function SearchLayout({ searchTerm }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [rankedLogs, setRankedLogs] = useState([]);
    const [summary, setSummary] = useState('');
    const [topTags, setTopTags] = useState([]);

    useEffect(() => {
        const fetchRankedLogs = async () => {
            if (searchTerm) {
                try {
                    const results = await getSimilarityRank(searchTerm);
                    setRankedLogs(results.logs);  // Set the ranked logs
                    setSummary(results.instructive_summary);  // Set the instructive summary
                    setTopTags(results.top_tags);  // Set the top tags
                    console.log(topTags)
                } catch (error) {
                    console.error('Error fetching ranked logs:', error);
                }
            }
        };

        fetchRankedLogs();
    }, [searchTerm]);

    const handleCardClick = (log) => {
        setSelectedLog(log);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLog(null);
    };

    if (searchTerm) {
        return (
            <div className='flex flex-row p-2'>
                <div className='w-1/3'>
                    <div>Advised Summary:</div>
                    <div className='border-grey bg-white'>
                        <div>{summary && <p>{summary}</p>}</div>
                        <div className='mt-2'>
                            Top Tags:
                            {topTags.map((tag, index) => (
                                <div key={index} className='px-1'>
                                    <span className={`${tag.type === 'Body' ? 'body_tag' : tag.type === 'Symptom' ? 'symptom_tag' : 'condition_tag'} pl-2`}>
                                        {tag.Title} Hi
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-96 overflow-y-scroll w-2/3 p-2">
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {rankedLogs.map((log, index) => (
                            <div
                                key={index}
                                className="w-full p-2 border-b border-gray-300 cursor-pointer"
                                onClick={() => handleCardClick(log)}
                            >
                                <LogSimilarCard logData={log} />
                            </div>
                        ))}
                    </div>
                </div>
                <Modal show={showModal} handleClose={handleCloseModal}>
                    <div className='w-[60vh]'>
                        <LogModalCard logData={selectedLog}/>
                    </div>
                </Modal>
            </div>
        );
    }

    return null;
}

export default SearchLayout;
