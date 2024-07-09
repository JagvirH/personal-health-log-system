import React from 'react';

const LogRankCard = ({ title, id, description, }) => {
  return (
    <div className=''>
      
        <div className='flex w-96 border hover: border-[#1479fd] rounded-xl shadow-xl'>
            <div className='bg-white rounded-xl p-4 flex-grow'>
                <div className='log_card_title mt-2'>
                    {title}
                </div>
                <div className='mt-2 '>
                    Description:
                    <br />
                    <div className='border border-[#1479fd] rounded'>
                        {description && description.length > 86 ? description.slice(0, 86) + '...' : description}
                    </div>
                </div>
                
            </div>
        </div>
      
    </div>
  );
}

export default LogRankCard;
