'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const ProjectInfo = ({project}) => {
  const router = useRouter()
  
  return (
    <div onClick={()=>{
      router.push(`/user/dashboard/myprojects/${project._id}`)
    }} className='cursor-pointer w-full resultinfo flex flex-row items-center py-6 px-2 justify-between hover:bg-gray-100'>
            <p className='block flex-shrink tbase black whitespace-nowrap overflow-ellipsis'>{project.title}</p>
        <div className='flex flex-row items-center justify-between xl:w-[350px]'>
            <p className='text-left w-28 tbase mx-4 black'>{project.date}</p>
            <p className='text-left w-28 tbase mx-4 black'>{project.time}</p>
        </div>
    </div>
  )
}

export default ProjectInfo
