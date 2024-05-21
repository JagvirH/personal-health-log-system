import React from 'react';
import getSimilarityRank from '@/backend/api/textSimilarity';

export async function SearchLayout ()  {
    const search = "My leg has some pain at the back near the joint";
    let greetings = [];
    const greetingscheck = await getSimilarityRank(search)

    return (
        <div>
            <div className='bg-[green]'>
            </div>
        </div>
    );

};

export default SearchLayout;
