import { getlog } from '@/backend/database/logs';
import LogEdit from '@/components/forms/LogEdit';
import React from 'react';

const Page = async ({ params }) => {

    const logId = params.LogId;
    const log = await getlog(logId);

    //console.log(log.Status)
    
    
    return (
        <div className='w-full flex flex-col'>
            
            <div>
                <div className='text-[40px]'>
                    Initial Assessment
                </div>
                
                <div className='border-grey'>
                    <LogEdit Id= {logId} description={log.Description} status={log.Status}/>
                    
                </div>
                
            </div>
            
            
        </div>
    );
};

export default Page;
