import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { auth, currentUser } from "@clerk/nextjs/server";
import { addUser, checkUser } from '@/backend/database/onboarding';
import { getBookmarkedLogs } from '@/backend/database/logs';
import HomeLogs from '@/components/layout_design/HomeLogs';

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

    return (
        <div>
            <div className='page_title text-2xl font-bold mb-4'>
                Home
            </div>
            <div className='px-8 py-1 h-full'>
                <div className='  w-1/2 h-[30vh]  overflow-y-auto border border-blue-500 p-4 bg-[#e8eced] rounded'>
                    <HomeLogs logs={logs} />
                </div>
            </div>
        </div>
    );
}

//bg-[#e8eced]