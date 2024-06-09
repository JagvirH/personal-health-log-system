"use client";

import ProfessionalOpinionForm from '@/components/forms/ProfessionalOpinionForm';
import React from 'react';

const Page = async ({ params }) => {
  const logId = params.LogId;
  console.log(logId);

  return (
    <div>
      <div className='text-[40px]'>
          Professional Opinion
      </div>
      <ProfessionalOpinionForm logId={logId} />
    </div>
  );
};

export default Page;
