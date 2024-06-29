import React from 'react';
import Image from 'next/image';

const LogBookmarkCard = ({ title, status, description, id }) => {
  return (
    <div className='border border-grey flex flex-row bg-white mb-2 p-4 rounded'>
      <div className='w-3/4'>
        <div className='flex flex-col'>
          <div className='font-bold'>
            {title}
          </div>
          <div className='border border-gray-300 mt-2 p-2 text-sm max-h-12 overflow-hidden rounded-xl'>
            <p className='line-clamp-3 pb-1'>{description}</p>
          </div>
        </div>
      </div>
      <div className='w-1/4 flex items-center justify-center p-4'>
        <div className='flex flex-row border border-blue-500 p-2 rounded'>
          <div className='text-sm'>
            Straight to <br /> journey
          </div>
          <div className='items-center justify-center'>
            <Image
              src={"/arrow-right-solid.svg"}
              alt="Arrow"
              width={20}
              height={20}
              className="hover-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogBookmarkCard;
