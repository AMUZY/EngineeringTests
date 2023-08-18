'use client'
import React, { useEffect, useState } from 'react'
import FAQrow from './FAQrow'


let allspans = [];
let arrows = [];
const FAQ = () => {

    useEffect(()=>{
        allspans = document.querySelectorAll('.row')
        arrows = document.querySelectorAll('.arrow')
    },[])

    const Expand = (id)=>{
        for(let i = 0; i < allspans.length ; i++){
            if(id == i){
                if(allspans[i].classList.contains('h-0')){
                    allspans[i].classList.toggle('h-0')
                    allspans[i].classList.toggle('h-auto')
                    allspans[i].classList.toggle('my-0')
                    allspans[i].classList.toggle('my-6')
                    arrows[i].classList.toggle('-rotate-180')
                    arrows[i].classList.toggle('rotate-0')
                }else{
                    allspans[i].classList.toggle('h-0')
                    allspans[i].classList.toggle('h-auto')
                    allspans[i].classList.toggle('my-0')
                    allspans[i].classList.toggle('my-6')
                    arrows[i].classList.toggle('-rotate-180')
                    arrows[i].classList.toggle('rotate-0')
                }
            }else{
                if(allspans[i].classList.contains('h-auto')){
                    allspans[i].classList.toggle('h-auto')
                    allspans[i].classList.toggle('h-0')
                    allspans[i].classList.toggle('my-6')
                    allspans[i].classList.toggle('my-0')
                    arrows[i].classList.toggle('rotate-0')
                    arrows[i].classList.toggle('-rotate-180')
                }
            }
        }
    }
    


  return (
    <div className='mt-16 mb-12 flex justify-center lg:mb-0 w-full'>
        <div className='w-max'>
            <h1 id='FAQ' className='nohighlight ttitle text-white'> FAQs </h1>
            <FAQrow id={0} Expand = {Expand} question={`Do I need to be an engineering student to use EngineeringTests?`} answer={`Our platform is available to everyone on a research`} />
            <FAQrow id={1} Expand = {Expand} question={`Do I have to pay to use EngineeringTests?`} answer={`No, registration is currently free but fees maybe incured later on prior to which users will be duly notified`} />
            <FAQrow id={2} Expand = {Expand} question={`Can I create presentation slides with EngineeringTests?`} answer={`You can only download your results in PDF format to be used in presentation or word documents`} />
            <FAQrow id={3} Expand = {Expand} question={`For how long will my charts be available here?`} answer={`They will be available for all the while our servers are up and running`} />
            <FAQrow id={4} Expand = {Expand} question={`Can I delete my account with EngineeringTests?`} answer={`Yes you can but note that your subsctiption will be cancelled`} />
        </div>
    </div>
  )
}

export default FAQ