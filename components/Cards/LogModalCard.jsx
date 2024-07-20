import React from 'react'

const LogModalCard = ({ logData }) => {
    //console.log(logData);
    
    const renderContent = (content) => {
        return content ? content : "User has not filled this entry";
    };

    return (
        <div className='p-1'>
            <div className='flex flex-col'>
                <div className='py-2'>
                    <div className='text-[30px]'>
                        {renderContent(logData?.title)}
                        <hr />
                    </div>
                </div>
                <div className='py-2'>
                    <div className='text-[20px]'>
                        Description:
                    </div>
                    <div className='border border-[#1479fd] rounded main_background p-1'>
                        {renderContent(logData?.description)}
                    </div>
                </div>
                <div className='py-2'>
                    <div className='text-[20px]'>
                        Others Opinion:
                    </div>
                    <div>
                        Got from: {renderContent(logData?.opinion?.who)}
                    </div>
                    <div className='border border-[#1479fd] rounded main_background p-1'>
                        {renderContent(logData?.opinion?.description)}
                    </div>
                </div>
                <div className='py-2'>
                    <div className='text-[20px]'>
                        Solution:
                    </div>
                    <div className='border border-[#1479fd] rounded main_background p-1'>
                        {renderContent(logData?.solution)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogModalCard;
