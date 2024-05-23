'use client';

import React, { useState } from 'react';
import SearchLogForm from '@/components/forms/searchLogForm';
import SearchLayout from '@/components/layout_design/SearchLayout';

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <main>
            <div className='page_title p-4'>
                Search
                <hr />
            </div>

            <div className='p-4 shadow-xl'>
                <SearchLogForm onSearch={handleSearch} />
            </div>

            <div>
                <SearchLayout searchTerm={searchTerm} />
            </div>
        </main>
    );
}
