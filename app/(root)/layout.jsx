import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '@/components/layout_design/Sidebar'

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <ClerkProvider>
        <body style={{ display: "flex" }}>
          <div className="w-1/8" style={{ flex: "1" }}>
            <Sidebar />
          </div>
          <div className="w-3/4" style={{ flex: "7" }}>
            <div className="main_background ">
              {children}
            </div>
            
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
