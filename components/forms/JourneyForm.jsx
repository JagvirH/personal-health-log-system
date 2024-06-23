"use client";
import { insertJourney } from '@/backend/database/journey';
import React, { useState, useEffect } from 'react';

const JourneyForm = ({ journey, logId }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (journey) {
      setTitle(journey.Title || '');
      setDate(journey.Date ? journey.Date.substring(0, 10) : ''); // Ensure date is in YYYY-MM-DD format
      setDescription(journey.Description || '');
    }
  }, [journey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && date && description) {
      try {
        await insertJourney({ logId, date, title, description });
        // Optionally, handle success (e.g., show a message, redirect, etc.)
      } catch (error) {
        console.error('Error inserting log:', error);
      }
    } else {
      console.log('All fields are required');
    }
  };

  return (
    <div className=''>

    
    <div className="rounded-lg">

    
    <form onSubmit={handleSubmit} className='p-4 '>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Title</label>
        <input
          type='text'
          className='mt-1 p-2 block w-full border rounded-xl'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='flex flex-row mb-4'>
        <div className='w-1/2 pr-2'>
          <label className='block text-sm font-medium text-gray-700'>Date</label>
          <input
            type='date'
            className='mt-1 p-2 rounded-md block w-full border rounded-xl'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='w-1/2 pl-2'>
          <label className='block text-sm font-medium text-gray-700'>Date</label>
            <input
              type=''
              className='mt-1 p-2 rounded-md block w-full border rounded-xl'
              value="Hi"
              onChange={(e) => setDate(e.target.value)}
            />
        </div>

      </div>
      
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Description</label>
        <textarea
          className='mt-1 p-2 block w-full border rounded-xl h-48'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='flex flex-row'>

      
        <button
            type='submit'
            className='blue_button w-1/2'
        >
            Save
        </button>
        <button
            type='submit'
            className='blue_button w-1/2'
        >
            Delete
        </button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default JourneyForm;
