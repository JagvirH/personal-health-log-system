import React from 'react';
import LogCard from '@/components/Cards/LogCard';
import { getLogs } from '@/backend/database/logs';
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
    const user = await currentUser();
    if (!user) return <p>Please log in to view logs.</p>;

    const logs = await getLogs({ userId: user.id });

    return (
        <div>
            <div className='page_title p-4'>
                Logs
                <hr />
            </div>
            <div className='flex flex-wrap'>
                {logs.map((log) => (
                    <div key={log.id} className="w-full sm:w-1/2 md:w-1/3 p-4 log_card">
                        <LogCard 
                            title={log.title} 
                            tags={log.tags.map(tag => ({ title: tag.title, type: tag.type }))} 
                            description={log.description} 
                            id={log.id}
                            bookmark={log.bookmark}
                            // status={log.status}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
