"use client"
import { editLogDescription } from '@/backend/database/logs';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const LogEdit = ({ Id, description, status }) => {
  const router = useRouter();
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentShare, setCurrentShare] = useState(status);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(currentDescription !== description || currentStatus !== status);
  }, [currentDescription, currentStatus, description, status]);

  const handleDescriptionChange = (e) => {
    setCurrentDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setCurrentStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("----------------")
    //console.log("Current Id", Id)
    //console.log('New Description:', currentDescription);
    //console.log('New Status:', currentStatus);
    //console.log("----------------")

    await editLogDescription({
      Id: Id,
      Description: currentDescription,
      Status: currentStatus
    });

    router.push(`/Logs/${Id}/Initial_Assessment`);

  };

  return (
    <div className='flex flex-col p-4'>
      <div>
        Description:
      </div>
      <form onSubmit={handleSubmit} className=''>
        <textarea
          className='bg-white rounded-xl p-2 w-full h-48'
          value={currentDescription}
          onChange={handleDescriptionChange}
        />
        <div className='flex flex-row'>
          <div className='mt-2 w-1/2 pr-2' >
            Status:
            <select
              className='bg-white rounded-xl p-2 w-full'
              value={currentShare}
              //sonChange={handleStatusChange}
            >
              <option value='Ongoing'>Ongoing</option>
              <option value='Solved'>Solved</option>
            </select>
          </div>
          <div>
            <div className='mt-2 w-full'>
              Happy to Share:
              <select
                className='bg-white rounded-xl p-2 w-full'
                value={currentStatus}
                //onChange={handleStatusChange}
              >
                <option value='Ongoing'>Yes im happy to share</option>
                <option value='Solved'>Nope boy</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className={`mt-2 p-2 rounded ${isChanged ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
          disabled={!isChanged}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default LogEdit;
