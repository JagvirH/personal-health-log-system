"use client"

import JourneySidebar from '@/components/layout_design/JourneySidebar'
import JourneyForm from '@/components/forms/JourneyForm';
import React, { useState } from 'react'

const Page = ({params}) => {
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setSelectedJourney({ title: '', date: '', description: '' }); // Empty form for creating new journey
  };

  const handleJourneySelect = (journey) => {
    setIsCreating(false);
    setSelectedJourney(journey);
  };

  //console.log("Here ->>>>" + params.LogId)
  const logId = params.LogId

  return (
    <div>
      <div className='flex flex-row w-full pl-2'>
        <div className='w-[450px]'>
          <div className='flex-col'>
            <div className='text-[30px] p-2'>
              Journey
            </div>
            <div className='blue_button p-2 h-12' onClick={handleCreate}>
              Create
            </div>
            <div className='pt-2'>
              <JourneySidebar onJourneySelect={handleJourneySelect} logId={logId} />
            </div>
          </div>
        </div>
        <div className='w-full pl-4 rounded rounded-xl'>
          {isCreating || selectedJourney ? (
            <JourneyForm journey={selectedJourney} logId={logId} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
