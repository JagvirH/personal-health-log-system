import { Inter } from "next/font/google";
import "../../../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server";
import { getlog } from "@/backend/database/logs";

export default async function RootLayout({ children, params }) {
    console.log("here");
    console.log(params.LogId);
    const logId = params.LogId;

    // Await the getlog function to retrieve log data
    const log = await getlog(logId);

    console.log(log);

    return (
        <div>
            <div>
              
            </div>
            {children}
        </div>
    );
}