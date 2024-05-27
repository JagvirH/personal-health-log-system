import { getlog } from '@/backend/database/logs';
import React from 'react';

const Page = async ({ params }) => {

    const logId = params.LogId;
    const log = await getlog(logId);
    console.log(log.Description)
    
    return (
        <div className='w-full flex flex-col'>
            <div className=''>
                Description:
            </div>
            <div className='border border-grey'>
                <div className='bg-white rounded-xl p-2'>
                    {log.Description}
                </div>

            </div>
        </div>
    );
};

export default Page;
