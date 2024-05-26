import { Inter } from "next/font/google";
import "../../../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server";
import { getlog } from "@/backend/database/logs";

export default async function RootLayout({ children, params }) {
    console.log("here");
    console.log(params.LogId);
    const logId = params.LogId;

    // Await the getlog function to retrieve log data - border border-[#1479fd]
    const log = await getlog(logId);
    console.log("-----------")
    console.log(log);
    console.log("-----------")

    return (
        <div> 
            <div className="p-8">
              <div className="bg-white p-4 text-[50px] rounded-xl ">
                {log.Title} Hi
              </div>

              <div className="flex">
                <div className="w-1/4 p-2">
                  Initial assessment 
                </div>
              <div className="w-3/4">
                {children}
              </div>
            
            

            </div>
              
            </div>
            
        </div>
    );
}