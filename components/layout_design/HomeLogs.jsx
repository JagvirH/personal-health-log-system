"use client";
import React from 'react';
import LogBookmarkCard from '../Cards/LogBookmarkCard';
import { useRouter } from "next/navigation";

const HomeLogs = ({ logs }) => {
  
  return (
    <div className='space-y-2 overflow-y-auto h-full'>
      {logs && logs.length > 0 ? (
        logs.map((log, index) => (
          <LogBookmarkCard key={index} title={log.Title} status={log.Status} description={log.Description} id={log.Id} />
        ))
      ) : (
        <div>No logs available</div>
      )}
    </div>
  );
};

export default HomeLogs;
