import { getLogsIssues, getTags } from '@/backend/database/statTesting'
import React from 'react'



const page = async() => {
    const logs = await getLogsIssues()
    const tags = await getTags()
    console.log("-----------------Start---------------------")
    console.log(logs)
    console.log("-----------------------------------------")
    console.log(tags)
    console.log("-----------------End---------------------")
    return (
        <div>
        Test page
        </div>
    )
}

export default page
