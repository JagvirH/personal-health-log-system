import React from 'react';
import Link from 'next/link';

const page = () => {
    return (
        <div className=''>
            <div className='h-[40vh] main_background rounded-b-xl border border-b-[#1479fd] border-r-[#1479fd] border-l-[#1479fd] p-1'>
                <div className='flex flex-row'>
                    <div className='blue_text_title underline underline-offset-4 w-1/2'>
                        <div className='pl-4 justify-center items-center'>
                            Personal <br />
                            Health <br />
                            Log
                        </div>
                    </div>
                    <div className='ml-auto pr-4 justify-center items-center'>
                        <div className='flex flex-row space-x-4'>
                            <div className='blue_button'>
                                <Link href="/sign-up">
                                    <button className="">
                                        sign up
                                    </button>
                                </Link>
                            </div>
                            <div className='blue_button'>
                                <Link href="/sign-in">
                                    <button className="">
                                        sign in
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
