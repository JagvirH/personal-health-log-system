import React from 'react';
//import LogCard from '@/components/Cards/LogCard';




export default async function Sidebar({title, tags, description}) {
    //console.log(tags[0])
    return (
        <div className='flex w-96 border hover: border-[#1479fd] rounded-xl '>
            <div className='bg-white rounded-xl p-4 flex-grow'>
                <div className='log_card_title mt-2'>
                    {title}
                </div>
                <div className='mt-2'>
                    Tags: {tags.map((tag, index) => (
                        <span key={index} className='card_tag pl-2'>{tag}</span>
                    ))}
                </div>
                <div className='mt-2 '>
                    Description:
                    <br />
                    <div className='border'>
                        {description.length > 86 ? description.slice(0, 86) + '...' : description}
                    </div>
                </div>
                <div className='blue_button p-2'>
                    Edit
                </div>
            </div>
        </div>
    );
}
