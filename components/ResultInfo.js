'use client'
import React from 'react'
import { useRouter,usePathname } from 'next/navigation'

const ResultInfo = ({result, projectid, resultid}) => {
  const path = usePathname()
  const router = useRouter()

  return (
    <div onClick={()=>{
        router.push(`/user/dashboard/myprojects/${projectid}/${resultid}`)
    }} className='cursor-pointer w-full resultinfo flex flex-row items-center py-6 px-2 justify-between hover:bg-gray-100'>
            <p className='block flex-shrink tbase black overflow-hidden whitespace-nowrap overflow-ellipsis'>{result.title}</p>
        <div className='flex flex-row xl:w-[700px] items-center justify-between'>
            <p className='text-left w-28 tbasebold mx-4 dorange'>{result.chosentest}</p>
            <p className='text-left w-28 tbase mx-4 black overflow-hidden whitespace-nowrap overflow-ellipsis'>{result.chosenproject}</p>
            <p className='text-left w-28 tbase mx-4 black'>{result.date}</p>
            <p className='text-left w-28 tbase mx-4 black'>{result.time}</p>
        </div>
    </div>
  )
}

export default ResultInfo