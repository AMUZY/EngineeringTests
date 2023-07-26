'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const FAQrow = ({id, state, question, answer, Expand}) => {
    const [rotation,setRotation] = useState('-rotate-180')
    const [showspan,setShowSpan] = useState('h-0')

    const showhide = ()=>{
        if(rotation == '-rotate-180' || showspan == 'h-0'){
            setRotation(`rotate-0`); 
            setShowSpan(`block h-auto my-6`)
        }else{
            setRotation(`-rotate-180`); 
            setShowSpan(`h-0`)
        }
    }
  return (
    <div onClick={()=>{
        Expand(id); 
        showhide()
        }} className='nohighlight smooth py-8 border-gray-200 border-b-[1px] cursor-pointer'>
        <div className='flex flex-row justify-between items-center'>
            <p className='nohighlight mb-4 tsubtitle text-white'>{question}</p>
            <Image className={`nohighlight smooth m-2 ${rotation}`} src='/assets/svgs/arrow.svg' width={16} height={8} alt='arrow logo' />
        </div>
        <div className={`overflow-hidden answer smooth ${showspan}`}>
            <p className='nohighlight tbase text-white'>
                {answer}
            </p>
        </div>
    </div>
  )
}

export default FAQrow