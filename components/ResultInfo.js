'use client'
import React from 'react'
import { useRouter,usePathname } from 'next/navigation'

const ResultInfo = ({result}) => {
  const path = usePathname()
  const router = useRouter()

  return (
    <div onClick={()=>{
        router.push(`${path}/${result.id}`)
    }} className='cursor-pointer w-full resultinfo flex flex-row items-center py-6 justify-between'>
            <p className='block flex-shrink tbase black overflow-hidden whitespace-nowrap overflow-ellipsis'>{'20% Cow Bone and Snail Shell Reinforced Polymer Composite Flexural Test'}</p>
        <div className='flex flex-row justify-evenly'>
            <p className='tbasebold mx-4 dorange'>{'Flexural Result'}</p>
            <p className='tbase mx-6 black overflow-hidden whitespace-nowrap overflow-ellipsis'>{'Second Project'}</p>
            <p className='tbase mx-6 black'>{'22-6-2023'}</p>
            <p className='tbase mx-6 black'>{'07:45'}</p>
        </div>
    </div>
  )
}

export default ResultInfo