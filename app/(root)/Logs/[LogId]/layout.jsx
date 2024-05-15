"use client"

import { Inter } from "next/font/google";
import "../../../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { useRouter } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";




export default async function RootLayout({ children, params }) {
  /*
  const router = useRouter();

  const logId = params.LogId
  const user = await currentUser()
  
  if(!user) return null;
  const userId = user?.id;

  const checkIfLogEqUsers = await checkIfUsersLog({userId,logId})

  //console.log(checkIfLogEqUsers)

  */

  return (
    <div>
      {children }
    </div>
  );

}
