import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { auth, currentUser } from "@clerk/nextjs/server";
import { checkIfUsersLog } from '@/backend/database/logs';

const Page = async ({ params }) => {

    //const router = useRouter();

    const logId = params.LogId
    const user = await currentUser()
    
    if(!user) return null;
    const userId = user?.id;

    const checkIfLogEqUsers = await checkIfUsersLog({userId,logId})

    //console.log(checkIfLogEqUsers)

    return(
        <div>
            Hello
        </div>
    )
}

export default Page;
