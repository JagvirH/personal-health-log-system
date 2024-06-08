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
    <form onSubmit={handleSubmit} className='p-4 bg-white rounded-lg'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Title</label>
        <input
          type='text'
          className='mt-1 p-2 block w-full border rounded-md'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Date</label>
        <input
          type='date'
          className='mt-1 p-2 block w-full border rounded-md'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Description</label>
        <textarea
          className='mt-1 p-2 block w-full border rounded-md'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='flex flex-row'>

      
        <button
            type='submit'
            className='blue_button w-1/2 px-2'
        >
            Save
        </button>
        <button
            type='submit'
            className='blue_button w-1/2 px-2'
        >
            Delete
        </button>
      </div>
    </form>
  );
};

export default JourneyForm;
