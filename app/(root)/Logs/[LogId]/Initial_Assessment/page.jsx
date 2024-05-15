"use client"

import { checkIfUsersLog } from '@/backend/database/logs';
import React from 'react'
import { useRouter } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

const Page = async ({ params }) => {

    //console.log(checkIfLogEqUsers)


    //console.log(params.LogId)
    return(
        <div>
            Hello
        </div>
    )
}

export default Page;
