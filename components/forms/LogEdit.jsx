'use client';
import { editLogDescription } from '@/backend/database/logs';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { addlogTags, deleteTags } from '@/backend/database/tags';

const LogEdit = ({ Id, description, status, tags, listOfTags, share }) => {
  const router = useRouter();
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentShare, setCurrentShare] = useState(share);
  const [isChanged, setIsChanged] = useState(false);

  const [selectedTags, setSelectedTags] = useState(tags);
  const [newTags, setNewTags] = useState([]);
  const [deletedTags, setDeletedTags] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState(listOfTags);

  useEffect(() => {
    setIsChanged(
      currentDescription !== description || 
      currentStatus !== status ||
      currentShare !== share ||
      newTags.length > 0 ||
      deletedTags.length > 0
    );
  }, [currentDescription, currentStatus, currentShare, description, status, share, newTags, deletedTags]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTags(listOfTags);
    } else {
      setFilteredTags(listOfTags.filter(tag => 
        tag.Title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, listOfTags]);

  const handleDescriptionChange = (e) => {
    setCurrentDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setCurrentStatus(e.target.value);
  };

  const handleShareChange = (e) => {
    setCurrentShare(e.target.value === '1');
  };

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value);
    if (e.target.checked) {
      const newTag = listOfTags.find(tag => tag.Id === tagId);
      setSelectedTags([...selectedTags, newTag]);
      setNewTags([...newTags, newTag]);
      setDeletedTags(deletedTags.filter(tag => tag.Id !== tagId));
    } else {
      const removedTag = selectedTags.find(tag => tag.Id === tagId);
      setSelectedTags(selectedTags.filter(tag => tag.Id !== tagId));
      setDeletedTags([...deletedTags, removedTag]);
      setNewTags(newTags.filter(tag => tag.Id !== tagId));
    }
  };

  const handleTagRemove = (tagId) => {
    const removedTag = selectedTags.find(tag => tag.Id === tagId);
    setSelectedTags(selectedTags.filter(tag => tag.Id !== tagId));
    setDeletedTags([...deletedTags, removedTag]);
    setNewTags(newTags.filter(tag => tag.Id !== tagId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editLogDescription({
      Id: Id,
      Description: currentDescription,
      Status: currentStatus,
      Share: currentShare,
    });

    if (newTags.length > 0) {
      for (const tag of newTags) {
        const tagId = tag.Id;
        await addlogTags({ Id, tagId });
      }
    }

    if (deletedTags.length > 0) {
      for (const tag of deletedTags) {
        const tagId = tag.Id;
        await deleteTags({ Id, tagId });
      }
    }

    router.push(`/Logs/${Id}/Initial_Assessment`)
    window.location.reload();
  };

  return (
    <div className='flex flex-col p-4'>
      <div>Description:</div>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='flex flex-row mb-4'>
          <textarea
            className='bg-white rounded-xl p-2 w-1/2 h-40 mr-2'
            value={currentDescription}
            onChange={handleDescriptionChange}
          />
          <div className='w-1/2 ml-2'>
            <input
              type='text'
              placeholder='Search tags...'
              className='bg-white rounded-xl p-2 w-full mb-2'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='max-h-40 overflow-y-auto border border-grey rounded-md p-2 bg-[white]'>
              {filteredTags.map(tag => (
                <div key={tag.Id} className='mr-4 mb-2'>
                  <label className='inline-flex items-center'>
                    <input
                      type='checkbox'
                      value={tag.Id}
                      checked={selectedTags.some(selectedTag => selectedTag.Id === tag.Id)}
                      onChange={handleTagChange}
                      className='form-checkbox'
                    />
                    <span className='ml-2'>{tag.Title}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-row mb-4'>
          <div className='w-1/2 pr-2'>
            Status:
            <select
              className='bg-white rounded-xl p-2 w-full'
              value={currentStatus}
              onChange={handleStatusChange}
            >
              <option value='Ongoing'>Ongoing</option>
              <option value='Solved'>Solved</option>
            </select>
          </div>
          <div className='w-1/2 pl-2'>
            Happy to Share:
            <select
              className='bg-white rounded-xl p-2 w-full'
              value={currentShare ? '1' : '0'}
              onChange={handleShareChange}
            >
              <option value='1'>Yes, I'm happy to share</option>
              <option value='0'>No</option>
            </select>
          </div>
        </div>
        <div className='py-4'>
          <div className=''>
            <div className='flex justify-center items-center p-1 md-text border-blue bg-[white]'>
              {selectedTags.map(tag => (
                <span key={tag.Id} className="tag-item px-1 flex flex-row ">
                  <div className='card_tag_remove'>
                    {tag.Title}
                  </div>
                  <button
                    type="button"
                    className='card_tag_remove-X'
                    onClick={() => handleTagRemove(tag.Id)}
                  >
                    X
                  </button>
                </span>
              ))}
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
