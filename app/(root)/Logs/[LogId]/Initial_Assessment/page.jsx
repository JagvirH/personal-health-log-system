import { checkIfUsersLog } from '@/backend/database/logs';
import React from 'react'
import { auth, currentUser } from "@clerk/nextjs/server";

const Page = async ({ params }) => {

    const logId = params.LogId
    const user = await currentUser()
    
    if(!user) return null;
    const userId = user?.id;

    const checkIfLogEqUsers = await checkIfUsersLog({userId,logId})

    console.log(checkIfLogEqUsers)

    //console.log(params.LogId)
    return(
        <div>
            Hello
        </div>
    )
}

export default Page;
