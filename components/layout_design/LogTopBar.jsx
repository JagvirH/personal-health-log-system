'use client';

import React, { useState } from 'react';
import { deleteLog, toggleBookmark } from "@/backend/database/logs";
import Image from 'next/image';
import Modal from '../Popup/Modal';

const LogTopBar = ({ logId, log }) => {
  const [showModal, setShowModal] = useState(false);
  const [bookmark, setBookmark] = useState(log.Bookmark);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = async () => {
    const newBookmark = !bookmark;
    setBookmark(newBookmark);

    try {
      await toggleBookmark({ logId, bookmark: newBookmark });
      console.log('Bookmark status updated');
    } catch (error) {
      console.error('Failed to update bookmark:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteLog({ logId });
      console.log('Log deleted');
      // Optionally, redirect or update the state to reflect the deletion
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Failed to delete log:', error);
    }
  };

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
            <div className="blue_button" onClick={() => setShowModal(true)}>
              Delete
            </div>
          </div>
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleBookmarkClick}
          >
            <Image
              src={bookmark ? "/bookmark-solid.svg" : "/bookmark-regular.svg"}
              alt="BookMark"
              width={40}
              height={40}
              className="hover-image"
            />
          </div>
        </div>
      </div>

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <div className='p-4 text-center'>
          <h2 className='text-[20px]'>Confirm Deletion</h2>
          <p>Are you sure you want to delete this log?</p>
          <div className='flex flex-row justify-center items-center pt-4 w-full'>
            <div>
              <button className='blue_button px-2' onClick={handleDeleteClick}>Delete</button>
            </div>
            <div>
              <button className='blue_button px-2' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogTopBar;
