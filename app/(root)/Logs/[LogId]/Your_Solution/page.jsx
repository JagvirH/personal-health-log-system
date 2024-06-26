import SolutionForm from '@/components/forms/SolutionForm';
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='text-[40px]'>
              Solution
      </div>
      <div className='border-grey'>
        <div className='p-4'>

          <SolutionForm />
          </div>
      </div>
    </div>
  );
};

export default page
