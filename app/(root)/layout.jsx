import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Sidebar from '@/components/layout_design/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="main_background" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <div 
            className="fixed top-0 left-0 h-full"
            style={{ 
              minWidth: "200px",  // Minimum width for smaller screens
              maxWidth: "300px",  // Maximum width for larger screens
              width: "15%",       // Dynamic width based on the viewport
              zIndex: "10" 
            }}
          >
            <Sidebar />
          </div>
          <div 
            className="fixed top-0 right-0 h-full"
            style={{ 
              left: "15%",   // Aligns the content next to the sidebar
              right: "0",    // Ensures it fills the remaining width
              padding: "1rem",
              overflowY: "auto" // Allows scrolling within the content area if needed
            }}
          >
            {children}
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

*/