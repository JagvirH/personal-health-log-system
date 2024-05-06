import React from 'react'
import LogCard from '@/components/Cards/LogCard'


export default async function Page() {

    return (
        <div>
            <div className='page_title p-4'>
                Logs
                <hr />
            </div>
            <div>
                <LogCard />
            </div>
            
        </div>
    )
}

//hover:border-4 hover:border-[#1479fd]
