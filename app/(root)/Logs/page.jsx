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

    const user = await currentUser()
    if(!user) return null;
    // Assuming you have some logic to fetch log cards data from a data source
    const logCardsData = [
        { title: "Ear infection", tags: ["Eyes", "Pain"], description: "There is dry skin around the ear where i can't sleep and it hurts. taking the scab off make it bleed" },
        { title: "Leg muscle", tags: ["Ears", "Headache"], description: "Description 2" },
        { title: "Leg muscle", tags: ["Ears", "Headache"], description: "Description 2" },
        { title: "Leg muscle", tags: ["Ears", "Headache"], description: "Description 2" },
        { title: "Leg muscle", tags: ["Ears", "Headache"], description: "Description 2" }
        // Add more log card data as needed
    ];

    const logs = await getLogs({userID : user?.id});

    console.log(logs)

    return (
        <div className="flex flex-wrap">
            {logCardsData.map((logCard, index) => (
                <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 log_card'>
                    <LogCard title={logCard.title} tags={logCard.tags} description={logCard.description} />
                </div>
            ))}
        </div>
    );
    
}


/*
import React from 'react'
import LogCard from '@/components/Cards/LogCard'


export default async function Page() {

    return (
        <div>
            <div className='page_title p-4 '>
                Logs
                <hr/>
            </div>
            <div className='flex pl-8 w-full' >
                <LogCard />
            </div>
            
        </div>
    )
}

//hover:border-4 hover:border-[#1479fd]
*/