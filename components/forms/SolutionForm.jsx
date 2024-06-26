"use client"

import React, { useState, useEffect } from 'react';

const SolutionForm = () => {
  const [solution, setSolution] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(solution.trim().length > 0);
  }, [solution]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChanged) {
      // Handle the save action
      console.log('Solution saved:', solution);
      
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className=" rounded-lg">
        <div className="mb-4">
          <label className="block text-sm pb-1 font-medium text-gray-700">Write what your solution is</label>
          <textarea
            className="bg-white rounded-xl p-2 w-full h-48"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
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

