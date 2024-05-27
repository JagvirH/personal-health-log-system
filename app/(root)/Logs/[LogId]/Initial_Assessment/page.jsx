import { getlog } from '@/backend/database/logs';
import LogEditDescription from '@/components/forms/LogEditDescription';
import React from 'react';

const Page = async ({ params }) => {

    const logId = params.LogId;
    const log = await getlog(logId);
    console.log(log.Description)
    
    return (
        <div className='w-full flex flex-col'>
            
            <div>
                <LogEditDescription description={log.Description}/>
            </div>
            
            
        </div>
    );
};

export default Page;
