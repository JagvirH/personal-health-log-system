'use client';

import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
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
import Image from 'next/image';

export default function CreateLogForm({ userId, tags }) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTags, setFilteredTags] = useState(tags);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredTags(tags);
        } else {
            setFilteredTags(tags.filter(tag =>
                tag.Title.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, tags]);

    useEffect(() => {
        autoSelectTags();
    }, [description]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Selected Tag IDs:', selectedTagIds);

        await addLog({
            userId: userId,
            title: title,
            description: description,
        });

        await addTags({
            userId: userId,
            title: title,
            description: description,
            tags: selectedTagIds
        });

        router.push("/Logs");
        window.location.reload();
    };

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setSelectedTagIds(prev =>
            checked ? [...prev, parseInt(value)] : prev.filter(tagId => tagId !== parseInt(value))
        );
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Body':
                return '/body-icon.png'; // Replace with your actual icon path
            case 'Symptom':
                return '/symptom-icon.png'; // Replace with your actual icon path
            case 'Condition':
                return '/condition-icon.png'; // Replace with your actual icon path
            default:
                return null;
        }
    };

    const getTagClass = (type) => {
        switch (type) {
            case 'Body':
                return 'body_tag';
            case 'Symptom':
                return 'symptom_tag';
            case 'Condition':
                return 'condition_tag';
            default:
                return '';
        }
    };

    const autoSelectTags = () => {
        const words = description.split(/\s+/);
        const matchingTags = tags.filter(tag => words.includes(tag.Title));
        const matchingTagIds = matchingTags.map(tag => tag.Id);

        setSelectedTagIds(matchingTagIds);
    };

    return (
        <div className='p-12'>
            <div className='bg-[#FFFFFF] rounded-lg p-6 shadow-lg'>
                <div className='text-[32px] mb-6'>
                    Initial Assessment
                    <hr className='my-4' />
                </div>
                <Form>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='space-y-4'>
                            <div>
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
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Description</label>
                                <textarea
                                    value={description}
                                    key='description'
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-none'
                                    placeholder='Enter description...'
                                ></textarea>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <label className='block text-sm font-medium text-gray-700'>Tags</label>
                            <input
                                type='text'
                                placeholder='Search tags...'
                                className='bg-white rounded-xl p-2 w-full mb-2'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className='max-h-40 overflow-y-auto border border-gray-300 rounded-xl p-2'>
                                {filteredTags.map(tag => (
                                    <div key={tag.Id} className='mr-4 mb-2 flex items-center'>
                                        <label className='inline-flex items-center'>
                                            <input
                                                type='checkbox'
                                                value={tag.Id}
                                                checked={selectedTagIds.includes(tag.Id)}
                                                onChange={handleTagChange}
                                                className='form-checkbox'
                                            />
                                            <Image
                                                src={getIcon(tag.Type)}
                                                alt={`${tag.Type} icon`}
                                                width={16}
                                                height={16}
                                                className='ml-2'
                                            />
                                            <span className='ml-2'>{tag.Title}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-wrap'>
                                {selectedTagIds.map((tagId, index) => (
                                    <div key={index} className={`${getTagClass(tags.find(tag => tag.Id === tagId).Type)} flex items-center px-2 py-1 mr-2 mb-2 rounded bg-gray-100`}>
                                        <Image
                                            src={getIcon(tags.find(tag => tag.Id === tagId).Type)}
                                            alt={`${tags.find(tag => tag.Id === tagId).Type} icon`}
                                            width={16}
                                            height={16}
                                            className='mr-2'
                                        />
                                        {tags.find(tag => tag.Id === tagId).Title}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='pt-6'>
                            <button
                                type='submit'
                                className='w-full bg-[#1479fd] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
