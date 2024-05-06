import React from 'react'

export default async function Page() {

    return (
        <div className='p-16'>
            <div className='bg-[#FFFFFF] rounded p-2'>
                <div className='text-[32px]'>
                    Whats the issue ?
                    <hr />
                </div>
                
                <form className='py-8 px-4'>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Title</label>
                        <input
                            type='text'
                            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            placeholder='Enter title...'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Description</label>
                        <textarea
                            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-none'
                            placeholder='Enter description...'
                        ></textarea>
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


