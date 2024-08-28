import React from 'react';
import { useRouter } from "next/navigation";

const LogBookmarkCard = ({ title, status, description, id }) => {
  const router = useRouter();

  const handleClick = () => {
    //console.log(id);
    router.push(`/Logs/${id}/Initial_Assessment`)
    //window.location.reload();
  };

  const handleJourneyClick = () => {
    console.log("hi")
    //router.push(`/Logs/${id}/Journey`)
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-row items-center justify-between rounded-lg border border-gray-300 bg-white text-gray-800 p-4 mb-4 w-full text-left shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <div className="w-3/4">
        <div className="flex flex-col">
          <div className="text-lg font-bold">
            {title}
          </div>
          <div className="rounded-lg bg-gray-100 mt-3 p-2 text-sm max-h-16 overflow-hidden">
            <p className="line-clamp-3">{description}</p>
          </div>
        </div>
      </div>
      <div className="w-1/4 flex flex-col items-center justify-center">
        <div className="border border-blue-500 p-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out">
          <div className="text-center">
            Straight to <br /> Journey
          </div>
        </div>
      </div>
    </button>


  );
};

export default LogBookmarkCard;

//b19bd554de9f44e6bedcad84c279e762
