'use client'
import React, { useEffect, useState } from 'react'
import FAQrow from './FAQrow'



let allspans = [];
const FAQ = () => {

    useEffect(()=>{
        allspans = document.querySelectorAll('.row')
    },[])

    const Expand = (id)=>{
        for(let i = 0; i < allspans.length ; i++){
            if(id == i){
                if(allspans[i].classList.contains('h-0')){
                    allspans[i].classList.toggle('h-0')
                    allspans[i].classList.toggle('h-auto')
                    allspans[i].classList.toggle('my-0')
                    allspans[i].classList.toggle('my-6')
                }else{
                    allspans[i].classList.toggle('h-0')
                    allspans[i].classList.toggle('h-auto')
                    allspans[i].classList.toggle('my-0')
                    allspans[i].classList.toggle('my-6')
                }
            }else{
                if(allspans[i].classList.contains('h-auto')){
                    allspans[i].classList.toggle('h-auto')
                    allspans[i].classList.toggle('h-0')
                    allspans[i].classList.toggle('my-6')
                    allspans[i].classList.toggle('my-0')
                }
            }
        }
    }
    


  return (
    <div className='mt-16 mb-12 flex justify-center lg:mb-0 w-full'>
        <div className='w-max'>
            <h1 id='FAQ' className='nohighlight ttitle text-white'> FAQs </h1>
            <FAQrow id={0} Expand = {Expand} question={`Do I need to be an engineering student to use EngineeringTests?`} answer={`No, you don’t have to be an engineering student to use EngineeringTests, our platform is available to everyone on a research`} />
            <FAQrow id={1} Expand = {Expand} question={`Do I have to pay to use EngineeringTests?`} answer={`our platform is available to everyone on a research`} />
            <FAQrow id={2} Expand = {Expand} question={`Can I create presentation slides with EngineeringTests?`} answer={`our platform is available to everyone on a research`} />
            <FAQrow id={3} Expand = {Expand} question={`For how long will my charts be available here?`} answer={`our platform is available to everyone on a research`} />
            <FAQrow id={4} Expand = {Expand} question={`Can I delete my account with EngineeringTests?`} answer={`our platform is available to everyone on a research`} />
        </div>
    </div>
  )
}

export default FAQ