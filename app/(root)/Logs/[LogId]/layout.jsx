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
                {log.Title} 
              </div>
              <div className="pt-4">
                <div className="bg-[white]">
                  Tags: 
                </div>
              </div>

              <div className="flex pt-4">
                <div className="w-1/4 p-2 border border-[#b5bac9] rounded-xl h-full justify-center items-center">
                  Pages: 
                  <div className="blue_button p-4">
                    Initial assessment 
                  </div>
                  <div className="blue_button p-4">
                    Professional Opinion
                  </div>
                  <div className="blue_button p-4">
                    Journey 
                  </div>
                  <div className="blue_button p-4">
                    Best solution 
                  </div>
                  
                </div>
              <div className="w-3/4">
                {children}
              </div>
            
            

            </div>
              
            </div>
            
        </div>
    );
}