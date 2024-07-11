import React from 'react'

const LogSimilarCard = ({logData}) => {
    const log = logData
    console.log(log.id)
    //console.log(log.log.title) {log.title} {log.description && log.description.length > 86 ? log.description.slice(0, 86) + '...' : log.description}
    return (
        <div className=''>
          
            <div className='flex w-96 border hover: border-[#1479fd] rounded-xl shadow-xl'>
                <div className='bg-white rounded-xl p-4 flex-grow'>
                    <div className='log_card_title mt-2'>
                        {log.title}
                    </div>
                    <div className='mt-2 '>
                        Description:
                        <br />
                        <div className='border border-[#1479fd] rounded background_main'>
                            {log.description}
                        </div>
                    </div>
                    
                </div>
            </div>
          
        </div>
      );
}

export default LogSimilarCard
