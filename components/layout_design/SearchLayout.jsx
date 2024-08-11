import React, { useEffect, useState } from 'react';
import getSimilarityRank from '@/backend/api/textSimilarity';
import LogSimilarCard from '../Cards/LogSimilarCard';
import Modal from '../Popup/Modal';
import LogModalCard from '../Cards/LogModalCard';
import Image from 'next/image';

export function SearchLayout({ searchTerm }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [rankedLogs, setRankedLogs] = useState([]);
    const [summary, setSummary] = useState('');
    const [topTags, setTopTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const getIcon = (type) => {
        switch(type) {
            case 'Body':
                return '/body-icon.png';
            case 'Symptom':
                return '/symptom-icon.png';
            case 'Condition':
                return '/condition-icon.png';
            default:
                return null;
        }
    }

    useEffect(() => {
        const fetchRankedLogs = async () => {
            if (searchTerm) {
                setIsLoading(true); // Start loading
                try {
                    const results = await getSimilarityRank(searchTerm);
                    setRankedLogs(results.logs);  // Set the ranked logs
                    setSummary(results.instructive_summary);  // Set the instructive summary
                    setTopTags(results.top_tags);  // Set the top tags

                    console.log("Fetched Tags:", results.top_tags);
                    console.log("Fetched Ranked Logs:", results.logs);
                } catch (error) {
                    console.error('Error fetching ranked logs:', error);
                } finally {
                    setIsLoading(false); // End loading
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="loader"></div> {/* Your loading icon or animation */}
            </div>
        );
    }

    if (searchTerm) {
        return (
            <div className='flex flex-row p-2'>
                <div className='w-1/3 pb-4'>
                    <div>Advised Summary:</div>
                    <div className='border-grey bg-white'>
                        <div>{summary && <p>{summary}</p>}</div>
                    </div>

                    Top Tags:
                    <div className='border-grey bg-white'>
                        <div className='mt-2 flex'>
                            {topTags && topTags.map((tag, index) => (
                                <div key={index} className='px-1'>
                                    <span className={`${tag.type === 'Body' ? 'body_tag' : tag.type === 'Symptom' ? 'symptom_tag' : 'condition_tag'} pl-2`}>
                                        <Image 
                                            src={getIcon(tag.type)} 
                                            alt={`${tag.type} icon`} 
                                            width={16} 
                                            height={16} 
                                        />
                                        {tag.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-[50vh] overflow-y-scroll w-2/3 p-2">
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
