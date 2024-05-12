import React from 'react';

export default async function Sidebar({title, tags, description}) {
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
                    <div className='border border-[#1479fd] rounded'>
                        {description.length > 86 ? description.slice(0, 86) + '...' : description}
                    </div>
                </div>
                <div className='pt-1'>
                    <div className='blue_button'>
                        Edit
                    </div>
                </div>
            </div>
        </div>
    );
}
