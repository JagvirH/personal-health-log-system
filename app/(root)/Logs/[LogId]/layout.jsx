import { Inter } from "next/font/google";
import "../../../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server";
import { getlog } from "@/backend/database/logs";
import Image from 'next/image';




export default async function RootLayout({ children, params }) {

    const logId = params.LogId;
    const log = await getlog(logId);

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
                <div className="w-1/4 p-2 border-grey h-full justify-center items-center">
                  Pages: 
                  <div className="blue_button p-4">
                  <Image 
                            src="/assessment-alt.png" 
                            alt="Assessment" 
                            width={50} 
                            height={50} 
                        />
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