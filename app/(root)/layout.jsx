import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '@/components/layout_design/Sidebar'


export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <ClerkProvider>
        <body className="main_background " style={{ display: "flex" }}>
          <div className="w-1/8" style={{ flex: "1" }}>
            <Sidebar />
          </div>
          <div className="w-3/4" style={{ flex: "7" }}>
            <div className="size-full ">
              {children}
            </div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}

/*
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '@/components/layout_design/Sidebar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="main_background flex">
          <div className="w-1/8 fixed top-0 left-0 h-full">
            <Sidebar />
          </div>
          <div className="w-3/4 ml-1/8" style={{ marginLeft: '12.5%' }}>
            <div className="size-full">
              {children}
            </div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}

*/