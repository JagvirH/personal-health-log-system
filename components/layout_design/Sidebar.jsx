import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { auth, currentUser } from "@clerk/nextjs/server";
import { addUser, checkUser } from '@/backend/users/onboarding';

// Importing Tailwind CSS styles
import '../../app/globals.css';

export default async function Sidebar() {
    return (
        <div className='sidebar_background'>
            <div className='h-full'>
                Home
            </div>
        </div>
    );
}



