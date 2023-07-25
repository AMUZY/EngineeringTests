'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import FAQrow from './FAQrow'

const FAQ = () => {
    const [expanded,setExpanded] = useState([
        {id: 0, state : false},
        {id: 1, state : false},
        {id: 2, state : false},
        {id: 3, state : false},
        {id: 4, state : false},
    ])
    const Expand = (id)=>{
        let newarray = expanded;
        for(let i = 0 ; i < expanded.length ; i++){
            if(id === expanded[i].id){
                newarray[i] = {id : i, state : true}
            }
            else{
                newarray[i] = {id : i, state : false}
            }
        }
        console.log(newarray)
        setExpanded(newarray)
    }
    


  return (
    <div className='mt-16 flex flex-row w-full'>
        <div className='w-full xl:w-[70%]'>
            <h1 className='nohighlight ttitle text-white'> FAQs </h1>
            <FAQrow id={0} Expand = {Expand} state={expanded[0].state} question={`Do I need to be an engineering student to use EngineeringTests?`} answer={`No, you don’t have to be an engineering student to use EngineeringTests, our platform is available to everyone on a research`} />
            <FAQrow id={1} Expand = {Expand} state={expanded[1].state} question={`Do I have to pay to use EngineeringTests?`} answer={`our platform is available to everyone on a research`} />
            <FAQrow id={2} Expand = {Expand} state={expanded[2].state} question={`Can I create presentation slides with EngineeringTests?`} answer={`our platform is available to everyone on a research`} />
            <FAQrow id={3} Expand = {Expand} state={expanded[3].state} question={`For how long will my charts be available here?`} answer={`our platform is available to everyone on a research`} />
            <FAQrow id={4} Expand = {Expand} state={expanded[4].state} question={`Can I delete my account with EngineeringTests?`} answer={`our platform is available to everyone on a research`} />
        </div>
        <div className='hidden xl:block w-[30%]'>
            <Image src='/assets/images/ET_trans.png' width={622} height={722} alt='engineeringtests logo transparent' />
        </div>
    </div>
  )
}

export default FAQ