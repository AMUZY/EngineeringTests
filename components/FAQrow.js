'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const FAQrow = ({id, state, question, answer, Expand}) => {
    const [rotation,setRotation] = useState('-rotate-180')


    const showhide = ()=>{
        if(rotation == '-rotate-180'){
            setRotation(`rotate-0`); 
        }else{
            setRotation(`-rotate-180`); 
        }
    }
  return (
    <div onClick={()=>{
        Expand(id); 
        showhide()
        }} className='nohighlight smooth py-8 border-gray-200 border-b-[1px] cursor-pointer'>
        <div className=' my-auto flex flex-row justify-between items-center'>
            <p className='nohighlight mb-4 tsubtitle text-white'>{question}</p>
            <Image className={`nohighlight smooth m-2 ${rotation}`} src='/assets/svgs/arrow.svg' width={16} height={8} alt='arrow logo' />
        </div>
        <div className={`row overflow-hidden answer smooth block my-0 h-0`}>
            <p className='nohighlight tbase text-white'>
                {answer}
            </p>
        </div>
    </div>
  )
}

export default FAQrow