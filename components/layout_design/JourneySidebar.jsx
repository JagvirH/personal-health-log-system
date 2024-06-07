import React from 'react';

const JourneySidebar = ({ onJourneySelect }) => {
  const journeys = [
    { id: 1, title: 'Journey 1', date: '2024-01-01', description: 'Description 1' },
    { id: 2, title: 'Journey 2', date: '2024-02-01', description: 'Description 2' },
    // Add more journeys here
  ];

  return (
    <div className='border-grey px-2 h-full'>
      {journeys.map((journey) => (
        <div 
          key={journey.id}
          className='cursor-pointer p-2'
          onClick={() => onJourneySelect(journey)}
        >
            <div className='rounded-xl bg-[white] p-2'> 
                <div className='text-xl'> 
                    {journey.title}
                    <hr />
                </div>
                <div> 
                    {journey.date}
                </div>
            </div>

          
        </div>
      ))}
    </div>
  );
};

export default JourneySidebar;
