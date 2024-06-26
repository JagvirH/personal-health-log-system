'use client';

import React, { useState, useEffect } from 'react';
import { getOpinion, insertOrUpdateOpinion, getWhoOptions } from '@/backend/database/opinion';
import { useRouter } from "next/navigation";

const ProfessionalOpinionForm = ({ logId }) => {
  const router = useRouter();
  const [whoOptions, setWhoOptions] = useState([]);
  const [whoId, setWhoId] = useState('');
  const [description, setDescription] = useState('');
  const [initialState, setInitialState] = useState({ whoId: '', description: '' });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchWhoOptions = async () => {
      try {
        const options = await getWhoOptions();
        setWhoOptions(options);
      } catch (error) {
        console.error('Error fetching who options:', error);
      }
    };

    const fetchOpinion = async () => {
      try {
        const opinion = await getOpinion({ logId });
        if (opinion) {
          setWhoId(opinion.WhoId || '');
          setDescription(opinion.Description || '');
          setInitialState({ whoId: opinion.WhoId || '', description: opinion.Description || '' });
        }
      } catch (error) {
        console.error('Error fetching opinion:', error);
      }
    };

    if (logId) {
      fetchWhoOptions();
      fetchOpinion();
    }
  }, [logId]);

  useEffect(() => {
    setIsChanged(
      whoId !== initialState.whoId || description !== initialState.description
    );
  }, [whoId, description, initialState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertOrUpdateOpinion({ logId, whoId, description });
      router.push(`/Logs/${logId}/Professional_Opinion`);
      window.location.reload();
      // Optionally, handle success (e.g., show a message, redirect, etc.)
    } catch (error) {
      console.error('Error saving opinion:', error);
    }
  };

  return (
    <div className='border-grey'>
      <form onSubmit={handleSubmit} className="p-4 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Who</label>
          <div className='bg-[green] rounded-xl'>
            <select
              className="bg-white rounded-xl p-2 w-full"
              value={whoId}
              onChange={(e) => setWhoId(e.target.value)}
            >
              <option value="">Select Who</option>
              {whoOptions.map(option => (
                <option key={option.Id} value={option.Id}>{option.Title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="bg-white rounded-xl p-2 w-full h-48"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-2 p-2 rounded ${isChanged ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
          disabled={!isChanged}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfessionalOpinionForm;
