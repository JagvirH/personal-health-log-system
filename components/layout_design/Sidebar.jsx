import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { auth, currentUser } from "@clerk/nextjs/server";
import { addUser, checkUser } from '@/backend/database/onboarding';
import Link from 'next/link'

// Importing Tailwind CSS styles
import '../../app/globals.css';

export default async function Sidebar() {
    // Define a list of items
    const items = ['Home', 'Logs', 'Search'];

    return (
        <div className='sidebar_background rounded-r-xl border border-[#1479fd]'>
            <div className='flex h-screen'>
                <div className='h-full'>
                    <div className='blue_text_title underline underline-offset-4'>
                        Personal Health Log
                    </div>
                    <div className='pt-8'>
                        <ul className="list-none">
                            {/* Map over the items array to generate list items */}
                            {items.map((item, index) => (
                                <Link href={`/${item}`} >
                                    <li key={index} className="sidebar_button p-4 ">
                                    
                                        {item}
                                    
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className='flex justify-center p-4 h-[10vh]'>
                            <div className='flex w-full h-full'>
                                <Link href={'/Create'}>
                                    <div className='blue_button text-lg' >
                                        Create + 
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
