import { getlog } from '@/backend/database/logs';
import { getTag, getTagLabel } from '@/backend/database/tags';
import LogEdit from '@/components/forms/LogEdit';
import React from 'react';

const Page = async ({ params }) => {

    const logId = params.LogId;
    const log = await getlog(logId);
    console.log(typeof logId)
    const listOfTags = await getTag()
    
    
    
    
    return (
        <div className='w-full flex flex-col'>
            
            <div>
                <div className='text-[40px]'>
                    Initial Assessment
                </div>
                
                <div className='border-grey'>
                    <LogEdit Id= {logId} description={log.Description} status={log.Status} tags={log.Tags} listOfTags={listOfTags} share={log.Share} />
                    
                </div>
                
            </div>
            
            
        </div>
    );
};

export default Page;
