import { getSolution } from '@/backend/database/solution';
import SolutionForm from '@/components/forms/SolutionForm';
import React from 'react'

const page = async ({ params }) => { 
  const logId = params.LogId;
  const solution = await getSolution({logId})
  console.log(solution)
  return (
    <div>
      <div className='text-[40px]'>
              Solution
      </div>
      <div className='border-grey'>
        <div className='p-4'>

          <SolutionForm logId = {logId} dbSolution = {solution}/>
          </div>
      </div>
    </div>
  );
};

export default page
