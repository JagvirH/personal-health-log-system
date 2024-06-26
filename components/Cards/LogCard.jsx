"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toggleBookmark } from '@/backend/database/logs'; // Ensure this import path is correct

export default function Sidebar({ title, tags, description, id, bookmark: initialBookmark }) {
    const [isHovered, setIsHovered] = useState(false);
    const [bookmark, setBookmark] = useState(initialBookmark);

    const handleBookmarkClick = async () => {
        const newBookmark = !bookmark;
        setBookmark(newBookmark);

        try {
            await toggleBookmark({ logId: id, bookmark: newBookmark });
            console.log('Bookmark updated');
        } catch (error) {
            console.error('Failed to update bookmark:', error);
        }
    };

    return (
        <div className='flex w-96 border hover:border-[#1479fd] rounded-xl shadow-2xl'>
            <div className='bg-white rounded-xl p-2 flex-grow'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex-1 flex justify-center'>
                        <div className='log_card_title mt-2'>
                            {title}
                        </div>
                    </div>
                    <div 
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleBookmarkClick}
                    >
                        <Image 
                            src={bookmark ? "/bookmark-solid.svg" : "/bookmark-regular.svg"}
                            alt="BookMark" 
                            width={20} 
                            height={20} 
                            className="hover-image"
                        />
                    </div>
                </div>

                <div className='mt-2 flex'>
                    Tags: {tags.map((tag, index) => (
                        <div key={index} className='px-1'><span className='card_tag pl-2'>{tag}</span></div>
                    ))}
                </div>
                <div className='mt-2'>
                    Description:
                    <br />
                    <div className='border border-[#1479fd] rounded main_background p-1'>
                        {description && description.length > 86 ? description.slice(0, 140) + '...' : description}
                    </div>
                </div>
                <div className='pt-1'>
                    <Link href={`Logs/${id}/Initial_Assessment`}>
                        <div className='blue_button'>
                            Edit
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
