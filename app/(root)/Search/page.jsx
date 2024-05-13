import React from 'react';
import SearchLogForm from '@/components/forms/searchLogForm';

export default async function Page() {
    return (
        <main>
            <div className='page_title p-4'>
                Search
                <hr />
            </div>

            <div>
                Hi
                <SearchLogForm />
            </div>

        </main>
    );
}
