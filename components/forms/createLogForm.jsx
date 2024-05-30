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
import { addTags } from '@/backend/database/tags';

export default function CreateLogForm ({userId, tags}) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Selected Tag IDs:', selectedTagIds);

        await addLog({
            userId: userId,
            title: title,
            description: description,
            //tags: selectedTagIds, // Sending tag IDs
        });

        await addTags({
            userId: userId,
            title: title,
            description: description,
            tags: selectedTagIds
        })

        router.push("/Logs");
    }

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setSelectedTagIds(prev => 
            checked ? [...prev, parseInt(value)] : prev.filter(tagId => tagId !== parseInt(value))
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
                            <div className='max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2'>
                                {tags.map(tag => (
                                    <div key={tag.Id} className='mr-4 mb-2'>
                                        <label className='inline-flex items-center'>
                                            <input
                                                type='checkbox'
                                                value={tag.Id}
                                                onChange={handleTagChange}
                                                className='form-checkbox'
                                            />
                                            <span className='ml-2'>{tag.Title}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-4 flex flex-wrap'>
                                {selectedTagIds.map((tagId, index) => (
                                    <div key={index} className='card_tag px-2 py-1 mr-2 mb-2'>
                                        {tags.find(tag => tag.Id === tagId).Title}
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
            </div>
        </div>
    );
}
