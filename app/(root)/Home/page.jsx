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

    console.log("test1 --> " + news.articles[0].title)
    //console.log(news)

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
                
            </div>
        </div>
    );
}

//bg-[#e8eced]

/*
{
      source: [Object],
      author: 'Jeff Lunden',
      title: 'Nonprofit pairs sighted riders with visually impaired riders on tandem bikes for free',
      description: "Riders who participate in InTandem Cycling in New York find out it's more than just riding a bike and more than just exercise. It's socialization, good for your mental health and its teamwork.",
      url: 'https://www.npr.org/2024/07/02/nx-s1-5018682/nonprofit-pairs-sighted-riders-with-visually-impaired-riders-on-tandem-bikes-for-free',
      urlToImage: 'https://media.npr.org/include/images/facebook-default-wide-s1400-c100.jpg',
      publishedAt: '2024-07-02T09:10:22Z',
      content: "Riders who participate in InTandem Cycling in New York find out it's more than just riding a bike and more than just exercise. It's socialization, good for your mental health and its teamwork."
    }
*/