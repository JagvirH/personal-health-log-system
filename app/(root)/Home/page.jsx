import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { auth, currentUser } from "@clerk/nextjs/server";
import { addUser, checkUser } from '@/backend/database/onboarding';
import { getBookmarkedLogs } from '@/backend/database/logs';


export default async function Page() {
    const user = await currentUser()
    if(!user) return null;

    const userId = user?.id;
    const userEmail = user?.firstName;
    const userName = user?.emailAddresses[0].emailAddress;

    //console.log(userEmail, userId, userName)
    const userExists = await checkUser({ userId });
    if (!userExists) {
        await addUser({ userId, userName, userEmail });
    }

    console.log(userId)

    const logs = getBookmarkedLogs({userId})

    //console.log(logs)

    return (
        <div>
            <div className='page_title'>
             Home
            </div>
            
            <div className='px-8 bg-[green] h-full'>
                Hi
                
            </div>
            
        </div>
    )
}


