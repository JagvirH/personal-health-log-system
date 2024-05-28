"use client"
import { editLogDescription } from '@/backend/database/logs';
import React, { useState, useEffect } from 'react';

const LogEditDescription = ({ Id, description }) => {
  const [currentDescription, setCurrentDescription] = useState(description);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(currentDescription !== description);
  }, [currentDescription, description]);

  const handleChange = (e) => {
    setCurrentDescription(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('New Description:', currentDescription);

    await editLogDescription({
        Id : Id,
        Description: currentDescription
    })

  };

  

  return (
    <div className='flex flex-col'>
      <div>
        Description:
      </div>
      <form onSubmit={handleSubmit} className='border border-grey'>
        <textarea
          className='bg-white rounded-xl p-2 w-full h-48'
          value={currentDescription}
          onChange={handleChange}
        />
        <button
          type='submit'
          className={`mt-2 p-2 rounded ${isChanged ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
          disabled={!isChanged}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default LogEditDescription;
