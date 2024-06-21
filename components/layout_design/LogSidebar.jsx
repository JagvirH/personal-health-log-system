'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LogSidebar = ({logId}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  //console.log("Here is the log id: " +logId)

  const menuItems = [
    { title: 'Initial_Assessment',name: 'Initial Assessment', imageSrc: '/assessment-alt.png', hoverImageSrc: '/assessment-alt-full.png' },
    { title: 'Professional_Opinion',name: 'Professional Opinion', imageSrc: '/user-md-chat.png', hoverImageSrc: '/user-md-chat-full.png' },
    { title: 'Journey',name: 'Journey', imageSrc: '/journey.png', hoverImageSrc: '/journey-full.png' },
    { title: 'Your_solution',name: 'Your solution', imageSrc: '/answer-alt.png', hoverImageSrc: '/answer-alt-full.png' }
  ];

  return (
    <div className=''>
      {menuItems.map((item, index) => (
        <div 
          key={index}
          className="flex flex-col items-center my-8 " 
          onMouseEnter={() => {
            //console.log(`Hovered over: ${item.title}`);
            //console.log(`Image path: ${hoveredItem === index ? item.hoverImageSrc : item.imageSrc}`);  
            setHoveredItem(index);
          }} 
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div>
            <Link href={`/Logs/${logId}/${item.title}`}>
              
                <Image 
                  src={hoveredItem === index ? item.hoverImageSrc : item.imageSrc} 
                  alt={item.title} 
                  width={70} 
                  height={70} 
                  className="hover-image"
                />
              
            </Link>
          </div>
          <div className={`hover-text ${hoveredItem === index ? 'font-bold' : ''} mt-2`}>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LogSidebar;
