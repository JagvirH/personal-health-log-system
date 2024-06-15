import { getlog } from '@/backend/database/logs';
import { getTag, getTagLabel } from '@/backend/database/tags';
import LogEdit from '@/components/forms/LogEdit';
import React from 'react';

const Page = async ({ params }) => {

    const logId = params.LogId;
    const log = await getlog(logId);
    const listOfTags = await getTag()
    //const tagLabel = await getTagLabel()
    //const Id = logId
    //console.log(Id)
    //const tag = await getTagLabel(Id)
    

    //console.log("here: " +log.Tags[0].Title)

    //console.log(log.Status)

    console.log(listOfTags)
    
    
    
    return (
        <div className='w-full flex flex-col'>
            
            <div>
                <div className='text-[40px]'>
                    Initial Assessment
                </div>
                
                <div className='border-grey'>
                    <LogEdit Id= {logId} description={log.Description} status={log.Status} tags={log.Tags} listOfTags={listOfTags} />
                    
                </div>
                
            </div>
            
            
        </div>
    );
};

export default Page;
