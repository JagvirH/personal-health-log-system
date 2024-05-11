import React from 'react';
//import LogCard from '@/components/Cards/LogCard';




export default async function Sidebar({title, tags, description}) {
    //console.log(tags[0])
    return (
        <div className='flex w-96'>
            <div className='bg-white rounded-xl p-4'>
                <div className='log_card_title pb-2'>
                    {title}
                </div>
                <div>
                    Tags: {tags.map((tag, index) => (
                        <span key={index} className='card_tag px-2'>{tag}</span>
                    ))}
                </div>
                <div className='pb-2'>
                    Description:
                    <br />
                    <div className='border'>
                        {description}
                    </div>
                </div>
                <div className='blue_button pb-2'>
                    Edit
                </div>
            </div>
        </div>
    );
}
