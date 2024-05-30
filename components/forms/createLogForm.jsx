'use client';

import '@/app/globals.css';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addLog } from '@/backend/database/logs';
import { usePathname, useRouter } from "next/navigation";

export default function CreateLogForm ({userId, tags}) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Selected Tags:', selectedTags);

        await addLog({
            userId: userId,
            title: title,
            description: description,
            tags: selectedTags, // Assuming the backend is expecting tags as well
        });

        router.push("/Logs");
    }

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setSelectedTags(prev => 
            checked ? [...prev, value] : prev.filter(tag => tag !== value)
        );
    }

    return (
        <div className='p-16'>
            <div className='bg-[#FFFFFF] rounded p-2'>
                <div className='text-[32px]'>
                    Initial Assessment
                    <hr />
                </div>
                <Form>
                    <form className='py-8 px-4' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Title</label>
                            <input
                                type='text'
                                key='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                placeholder='Enter title...'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Description</label>
                            <textarea
                                value={description}
                                key='description'
                                onChange={(e) => setDescription(e.target.value)}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-none'
                                placeholder='Enter description...'
                            ></textarea>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Tags</label>
                            <div className='flex flex-wrap'>
                                {tags.map(tag => (
                                    <div key={tag.Id} className='mr-4'>
                                        <label className='inline-flex items-center'>
                                            <input
                                                type='checkbox'
                                                value={tag.Title}
                                                onChange={handleTagChange}
                                                className='form-checkbox'
                                            />
                                            <span className='ml-2'>{tag.Title}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-[#1479fd] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Submit
                        </button>
                    </form>
                </Form>
                <div className='mt-4'>
                    <h3 className='text-sm font-medium text-gray-700'>Selected Tags:</h3>
                    <ul>
                        {selectedTags.map((tag, index) => (
                            <li key={index} className='text-sm text-gray-700'>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
