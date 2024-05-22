'use client';
import React, { useState } from 'react';

export default function SearchLogForm({ onSearch }) {
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSearch(description);
    };

    return (
        <div className='bg-[#FFFFFF] rounded p-2'>
            <div className='flex flex-row'>
                <div className='w-3/4'>
                    <form className='p-2' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>
                                Type in what your initial assessment is
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-none'
                                placeholder='Enter description...'
                            ></textarea>
                        </div>
                        <button type='submit' className='blue_button'>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
