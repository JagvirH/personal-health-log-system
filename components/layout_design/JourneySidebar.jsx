"use client";
import React, { useState, useEffect } from 'react';
import { getJourneys as fetchJourneys } from '@/backend/database/journey';

const JourneySidebar = ({ onJourneySelect, logId }) => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const getJourneys = async () => {
      try {
        const fetchedJourneys = await fetchJourneys({ logId });
        console.log("HERE --->", fetchedJourneys);
        // Ensure dates are formatted to strings
        const formattedJourneys = fetchedJourneys.map(journey => ({
          ...journey,
          Date: new Date(journey.Date).toLocaleDateString(), // Convert to a readable date format
        }));
        setJourneys(formattedJourneys);
      } catch (error) {
        console.error('Error fetching journeys:', error);
      }
    };

    if (logId) {
      getJourneys();
    }
  }, [logId]);

  return (
    <>
      {journeys.length > 0 ? (
        <div className='border-grey px-2 h-full max-h-96 overflow-y-auto'>
        {journeys.map((journey) => (
          <div 
            key={journey.Id}
            className='cursor-pointer p-2'
            onClick={() => onJourneySelect(journey)}
          >
            <div className='rounded-xl bg-[white] p-2'>
              <div className='text-xl'>
                {journey.Title}
                <hr />
              </div>
              <div>
                {journey.Date}
              </div>
            </div>
          </div>
        ))}
        </div>) : null}
    </>
  );
  
  
};

export default JourneySidebar;
