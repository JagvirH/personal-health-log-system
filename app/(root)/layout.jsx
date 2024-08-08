import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Sidebar from '@/components/layout_design/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="main_background" style={{ display: "flex" }}>
          <div 
            className="fixed top-0 left-0 h-full"
            style={{ 
              minWidth: "200px",  // Minimum width for smaller screens
              maxWidth: "300px",  // Maximum width for larger screens
              width: "15%",       // Dynamic width based on the viewport
              flex: "1",
              zIndex: "10" 
            }}
          >
            <Sidebar />
          </div>
          <div 
            className="ml-[220px]"  // Matches the min width of the sidebar
            style={{ 
              flex: "7", 
              paddingLeft: "1rem",
              marginLeft: "15%",  // Adjust margin-left to match sidebar width
            }}
          >
            <div className="size-full">
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