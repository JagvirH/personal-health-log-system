import React from 'react';
import { useRouter } from "next/navigation";

const LogBookmarkCard = ({ title, status, description, id }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log(id);
    router.push(`/Logs/${id}/Initial_Assessment`)
    //window.location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className='border border-gray-300 flex flex-row bg-white mb-2 p-4 rounded w-full text-left hover:border-blue-500'
    >
      <div className='w-3/4'>
        <div className='flex flex-col'>
          <div className='font-bold'>
            {title}
          </div>
          <div className='border border-gray-300 mt-2 p-2 text-sm max-h-12 overflow-hidden'>
            <p className='line-clamp-3'>{description}</p>
          </div>
        </div>
      </div>
      <div className='w-1/4 flex flex-col items-center justify-center p-4'>
        <div className='border border-blue-500 p-2 rounded'>
          <div>
            Straight to <br /> journey
          </div>
        </div>
      </div>
    </button>
  );
};

export default LogBookmarkCard;
