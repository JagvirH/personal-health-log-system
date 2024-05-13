'use client'
import '@/app/globals.css'
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { usePathname, useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

export default function SearchLogForm() {

    const [description, setDescription] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Description:', description);

    }
    return (
        <div className='bg-[#FFFFFF] rounded p-2'>
            <form className='p-2' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Type in what your initial assessment is</label>
                        <textarea
                            value={description}
                            key='description'
                            onChange={(e) => setDescription(e.target.value)}
                            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-none'
                            placeholder='Enter description...'
                        ></textarea>
                </div>
            

            </form>

        </div>
    );
}
