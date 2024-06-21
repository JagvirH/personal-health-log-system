

import { Inter } from "next/font/google";
import "../../../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server";
import { getlog } from "@/backend/database/logs";
import Image from 'next/image';
import LogSidebar from "@/components/layout_design/LogSidebar";
import LogTopBar from "@/components/layout_design/LogTopBar";
//import Image from 'next/image';

export default async function RootLayout({ children, params }) {

    const logId = params.LogId;
    const log = await getlog(logId);
    //console.log(log.Tags)
    

    return (
      
        <div className="p-8"> 
        
            

              <LogTopBar logId={logId} log={log}/>

              <div className="flex pt-4 ">
                <div className="w-[220px] h-full p-2 h-full justify-center items-center " >
                  <LogSidebar logId = {logId} />
                </div>
              <div className="w-full">
                {children}
              </div>

            </div>
              
            
            
        </div>
    );
}