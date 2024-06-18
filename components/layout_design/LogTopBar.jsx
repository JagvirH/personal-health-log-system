'use client';

import React from 'react';
import { deleteLog } from "@/backend/database/logs";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const LogTopBar = ({ logId, log }) => {
    const router = useRouter();
    const handleDeleteClick = async () => {
        await deleteLog({ logId });
        console.log('Log deleted');
        router.push(`/Logs`);
        
    }

    return (
        <div>
        <div className=" ">
            <div className="bg-white p-4 text-[50px] rounded-xl border border-grey ">
            {log.Title}
            </div>
            <div className="pt-4 flex flex-row">
            <div className="border-grey p-2 flex items-center w-4/5">
                <div className="justify-center items-center p-1 md-text">Tags: </div>
                {log.Tags.map(tag => (
                <span key={tag.Id} className="tag-item px-1 ">
                    <div className="card_tag">
                    {tag.Title}
                    </div>
                </span>
                ))}
            </div>
            <div className="w-[200px] h-full px-2">
                <div className="blue_button" onClick={handleDeleteClick}>
                Delete
                </div>
            </div>
            <div className="">
                <Image
                src={"/bookmark-solid.svg"}
                alt="BookMark"
                width={40}
                height={40}
                className="hover-image"
                />
            </div>
            </div>
        </div>
        </div>
    );
};

export default LogTopBar;
