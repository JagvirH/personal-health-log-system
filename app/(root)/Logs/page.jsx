import React from 'react';
import LogCard from '@/components/Cards/LogCard';
import { getLogs } from '@/backend/database/logs';
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {

    return (
        <div>
            <div className='page_title p-4'>
                Logs
                <hr/>
            </div>
            <div className='pl-8 flex flex-wrap'>
                <LogCardWrapper />
            </div>
        </div>
    );
}

export async function LogCardWrapper() {
    const user = await currentUser();
    if (!user) return null;

    const logs = await getLogs({ userId: user.id });

    return (
        <main>
            <div className="flex flex-wrap">
                {logs.map((log) => (
                    <div key={log.id} className="w-full sm:w-1/2 md:w-1/3 p-4 log_card">
                        <LogCard 
                            title={log.title} 
                            tags={log.tags.map(tag => tag.title)} 
                            description={log.description} 
                            id={log.id}
                            //status={log.status}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}


/*
<div className="flex flex-wrap">
                {logCardsData.map((logCard, index) => (
                    <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 log_card'>
                        <LogCard title={logCard.title} tags={logCard.tags} description={logCard.description} />
                    </div>
                ))}
            </div>


    

*/