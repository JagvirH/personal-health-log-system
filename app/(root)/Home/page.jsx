import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { auth, currentUser } from "@clerk/nextjs/server";
import { addUser, checkUser } from '@/backend/database/onboarding';
import { getBookmarkedLogs } from '@/backend/database/logs';
import HomeLogs from '@/components/layout_design/HomeLogs';
import { getNews } from '@/backend/api/news';

export default async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userId = user?.id;
    const userEmail = user?.firstName;
    const userName = user?.emailAddresses[0].emailAddress;

    const userExists = await checkUser({ userId });
    if (!userExists) {
        await addUser({ userId, userName, userEmail });
    }

    const logs = await getBookmarkedLogs({ userId });
    const news = await getNews();

    console.log(news)

    //const firstNewsItem = news[0];

    // Log the first news item
    //console.log(firstNewsItem);

    return (
        <div>
            <div className=' mb-4 page_title'>
                Home
            </div>

            <div className='px-8 py-1 h-full w-1/2'>
                <div className='heading_text pl-1'>
                    Bookmarks
                </div>
                <div className='border border-grey p-1'>
                    
                    
                
                    <div className=' h-[30vh]  overflow-y-auto border  p-4 bg-[#e8eced] rounded'>
                        <HomeLogs logs={logs} />
                    </div>
                </div>
            </div>
            <div>
                {news[0]}
            </div>
        </div>
    );
}

//bg-[#e8eced]