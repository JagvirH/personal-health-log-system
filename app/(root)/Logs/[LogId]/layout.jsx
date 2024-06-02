import { Inter } from "next/font/google";
import "../../../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server";
import { getlog } from "@/backend/database/logs";
import Image from 'next/image';
import LogSidebar from "@/components/layout_design/LogSidebar";




export default async function RootLayout({ children, params }) {

    const logId = params.LogId;
    const log = await getlog(logId);
    console.log(log.Description)

    return (
        <div> 
            <div className="p-8">
              <div className="bg-white p-4 text-[50px] rounded-xl ">
                {log.Title} 
              </div>
              <div className="pt-4">
                <div className="border-grey p-1">
                  Tags: 
                </div>
              </div>

              <div className="flex pt-4">
                <div className="w-[180px] h-full p-2 h-full justify-center items-center " >
                  <LogSidebar logId = {logId} />
                </div>
              <div className="w-3/4">
                {children}
              </div>

            </div>
              
            </div>
            
        </div>
    );
}