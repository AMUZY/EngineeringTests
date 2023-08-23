'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const ProjectInfo = ({project}) => {
  const router = useRouter()
  
  return (
    <div onClick={()=>{
      router.push(`/dashboard/myprojects/${project._id}`)
    }} className='cursor-pointer w-full resultinfo flex flex-row items-center py-6 px-2 justify-between hover:bg-gray-100'>
            <p className='block flex-shrink tbase black whitespace-nowrap overflow-ellipsis'>{project.title}</p>
        <div className='flex flex-row justify-evenly'>
            <p className='tbase mx-6 black'>{project.date}</p>
            <p className='tbase ml-10 mr-8 black'>{project.time}</p>
        </div>
    </div>
  )
}

export default ProjectInfo
