import React from 'react';
import SearchLogForm from '@/components/forms/searchLogForm';

export default async function Page() {
    return (
        <main>
            <div className='page_title p-4'>
                Search
                <hr />
            </div>

            <div className='p-4'>
                
                <SearchLogForm />
            </div>

        </main>
    );
}
