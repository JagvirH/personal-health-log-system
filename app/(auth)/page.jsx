import React from 'react'
import Link from 'next/link';
//onClick={() => handleTradeChange()}  

const page = () => {
    return (
        <div>
            
            <Link href="/sign-up"> {/* Use the Link component and specify the target URL */}
                <button 
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                    sign up
                </button>
            </Link>

            <Link href="/sign-in"> {/* Use the Link component and specify the target URL */}
                <button 
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                    sign in
                </button>
            </Link>

        </div>
    )
}

export default page
