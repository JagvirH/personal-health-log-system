import React, { useState, useEffect } from 'react';

const JourneyForm = ({ journey }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (journey) {
      setTitle(journey.title || '');
      setDate(journey.date || '');
      setDescription(journey.description || '');
    }
  }, [journey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, date, description });
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
      <button
        type='submit'
        className='mt-2 p-2 bg-blue-500 text-white rounded'
      >
        Save
      </button>
    </form>
  );
};

export default JourneyForm;
