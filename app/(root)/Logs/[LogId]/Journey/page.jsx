import JourneySidebar from '@/components/layout_design/JourneySidebar'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='flex flex-row w-full pl-2'>
        
        <div className='w-[450px]'>
          <div className='flex-col'>
            <div className='text-[30px] p-2'>
              Journey
            </div>
            <div className='blue_button p-2 h-12'>
              Create
            </div>
            <div className='pt-2'>
              <JourneySidebar />
            </div>

          </div>
          
        </div>
        <div className='w-full p-2 bg-[green]'>
           
        </div>

      </div>
      
    </div>
  )
}

export default page
