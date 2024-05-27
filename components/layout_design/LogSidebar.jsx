'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const LogSidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { title: 'Initial assessment', imageSrc: '/assessment-alt.png', hoverImageSrc: '/assessment-alt-full.png' },
    { title: 'Professional Opinion', imageSrc: '/user-md-chat.png', hoverImageSrc: '/user-md-chat-full.png' },
    { title: 'Journey', imageSrc: '/journey.png', hoverImageSrc: '/journey-full.png' },
    { title: 'Best solution', imageSrc: '/answer-alt.png', hoverImageSrc: '/answer-alt-full.png' }
  ];

  return (
    <div className=''>
      {menuItems.map((item, index) => (
        <div 
          key={index}
          className="flex flex-col items-center my-8 " 
          onMouseEnter={() => {
            console.log(`Hovered over: ${item.title}`);
            console.log(`Image path: ${hoveredItem === index ? item.hoverImageSrc : item.imageSrc}`);
            setHoveredItem(index);
          }} 
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div>
            <Image 
              src={hoveredItem === index ? item.hoverImageSrc : item.imageSrc} 
              alt={item.title} 
              width={70} 
              height={70} 
              className="hover-image"
            />
          </div>
          <div className={`hover-text ${hoveredItem === index ? 'font-bold' : ''} mt-2`}>
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LogSidebar;
