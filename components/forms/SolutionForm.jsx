"use client"

import { insertOrUpdateSolution } from '@/backend/database/solution';
import React, { useState, useEffect } from 'react';

const SolutionForm = ({ logId, dbSolution }) => {
  const [solution, setSolution] = useState(dbSolution || ''); // Initialize with dbSolution
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(solution.trim() !== dbSolution.trim());
  }, [solution, dbSolution]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isChanged) {
      await insertOrUpdateSolution({ logId, solution });
      setIsChanged(false); // Reset isChanged after saving
    }
  };

  const handleChange = (e) => {
    setSolution(e.target.value);
    setIsChanged(e.target.value.trim() !== dbSolution.trim());
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className="rounded-lg">
        <div className="mb-4">
          <label className="block text-sm pb-1 font-medium text-gray-700">Write what your solution is</label>
          <textarea
            className="bg-white rounded-xl p-2 w-full h-48"
            value={solution}
            onChange={handleChange}
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

export default SolutionForm;
