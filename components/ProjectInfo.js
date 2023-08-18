'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const ProjectInfo = ({project}) => {
  const router = useRouter()
  
  return (
    <div onClick={()=>{
      router.push(`dashboard/myprojects/${project.id}`)
    }} className='cursor-pointer w-full resultinfo flex flex-row items-center py-6 justify-between'>
            <p className='block flex-shrink tbase black whitespace-nowrap overflow-ellipsis'>{'My Second Project in Year 5'}</p>
        <div className='flex flex-row justify-evenly'>
            <p className='tbase mx-6 black'>{'22-6-2023'}</p>
            <p className='tbase ml-10 mr-8 black'>{'07:45'}</p>
        </div>
    </div>
  )
}

export default ProjectInfo
