import React from 'react';
import { currentUser } from "@clerk/nextjs/server";

const page = async() => {
    // const logs = await getLogsIssues();
    // const tags = await getTags();

    const user = await currentUser();
    if (!user) return null;

    

    // Handlers for the buttons
    const handleAddClick1 = () => {
        console.log('hi');
    };

    const handleRemoveClick1 = () => {
        console.log('hi');
    };

    return (
        <div>
            <div>
                Test 1
                <div>
                    <div className='blue_button' onClick={handleAddClick1}>
                        add
                    </div>
                </div>
                <div>
                    <div className='blue_button' onClick={handleRemoveClick1}>
                        remove
                    </div>
                </div>
            </div>

            <div>
                Test 2
                <div>
                    <div className='blue_button' onClick={handleAddClick}>
                        add
                    </div>
                </div>
                <div>
                    <div className='blue_button' onClick={handleRemoveClick}>
                        remove
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
