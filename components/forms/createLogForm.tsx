'use client'

import React, { useState } from 'react';

const CreateLogForm = () => {
    const x = 4

    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Description:', description);

    }


    return (
        <div className='p-16'>
            <div className='bg-[#FFFFFF] rounded p-2'>
                <div className='text-[32px]'>
                    Initial Assessment
                    <hr />
                </div>
                
                <form className='py-8 px-4' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Title</label>
                        <input
                            type='text'
                            key='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            placeholder='Enter title...'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Description</label>
                        <textarea
                            value={description}
                            key='description'
                            onChange={(e) => setDescription(e.target.value)}
                            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-none'
                            placeholder='Enter description...'
                        ></textarea>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Tags</label>
                        <select
                            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            multiple={true}
                            size={4} // Display 4 options at a time
                        >
                            <option value='eyes'>Eyes</option>
                            <option value='head'>Head</option>
                            <option value='stomach'>Stomach</option>
                            <option value='cold'>Cold</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-[#1479fd] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateLogForm