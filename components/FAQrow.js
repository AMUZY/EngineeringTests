import React from 'react'
import Image from "next/image"

const FAQrow = ({id, state, question, answer, Expand}) => {
  return (
    <div onClick={()=>{
        Expand(id); 
        }} className='nohighlight smooth py-8 border-gray-200 border-b-[1px] cursor-pointer'>
        <div className=' my-auto flex flex-row justify-between items-center'>
            <p className='nohighlight mb-4 tsubtitle text-white'>{question}</p>
            <Image className={`arrow nohighlight smooth m-2 -rotate-180 `} src='/assets/svgs/arrow.svg' width={16} height={8} alt='arrow logo' />
        </div>
        <div className={`row overflow-hidden answer smooth block my-0 h-0`}>
            <p className='nohighlight tbase text-white'>
                {'- ' + answer}
            </p>
        </div>
    </div>
  )
}

export default FAQrow