import React from 'react';
import LogCard from '@/components/Cards/LogCard';

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
    // Assuming you have some logic to fetch log cards data from a data source
    const logCardsData = [
        { title: "Title 1", tags: ["Eyes", "Pain"], description: "Description 1 wemdjwekm d d d d d d d d d d d d d d d d d d dd " },
        { title: "Title 2", tags: ["Ears", "Headache"], description: "Description 2" },
        // Add more log card data as needed
    ];

    return (
        <>
            {logCardsData.map((logCard, index) => (
                <div key={index} className='w-full p-4'>
                    <LogCard title={logCard.title} tags={logCard.tags} description={logCard.description} />
                </div>
            ))}
        </>
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