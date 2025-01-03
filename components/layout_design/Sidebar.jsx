
import React from 'react';
import { ClerkProvider, OrganizationProfile, SignedIn, SignOutButton } from '@clerk/nextjs';
import { auth, currentUser } from "@clerk/nextjs/server";
import { addUser, checkUser } from '@/backend/database/onboarding';
import Link from 'next/link'
import Image from 'next/image';

//,'Test','Test2'
// Importing Tailwind CSS styles
import '../../app/globals.css';

export default async function Sidebar() {
    // Define a list of items\
    const items = ['Home', 'Logs', 'Search'];

    return (
        <div className='sidebar_background rounded-r-xl border border-[#1479fd] h-full'>
            <div className='flex flex-col h-screen'>
                <div>
                    <div className='blue_text_title underline underline-offset-4'>
                        <Image 
                        src='/logo.png' 
                        alt='logo' 
                        width={1300} 
                        height={1300} 
                      />
                    </div>
                    <div className='pt-8'>
                        <ul className="list-none">
                            {items.map((item, index) => (
                                <Link href={`/${item}`} key={index} >
                                    <li className="sidebar_button p-4">
                                        {item}
                                        
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className='flex justify-center p-4'>
                        <Link href={'/Create'}>
                            <div className='blue_button text-lg'>
                                Create +
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='mt-auto p-4 pb-24'>
                    <SignOutButton>
                        <div className='blue_button text-lg'>
                            Log Out
                        </div>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
