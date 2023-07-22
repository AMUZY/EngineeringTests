'use client'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'


const Spans = () => {
    const [spanset1,setSpanSet1] = useState('');
    const [spanset2,setSpanSet2] = useState('');
    // const [box,setBox] = useState('hide')

    const hiddenelements = document.querySelectorAll('.hide');
    const otherelements = document.querySelectorAll('.other');
    const spans = document.querySelectorAll('.span');
    const spans2 = document.querySelectorAll('.span_second');
    console.log(hiddenelements.length)
    

    const observer = new IntersectionObserver((items)=>{   
        items.forEach((item) => {
            if(item.isIntersecting){
                item.target.classList.add('show')
            }
            else{
                item.target.classList.remove('show')
            }
        });
    });

    hiddenelements.forEach((item)=> observer.observe(item));
    otherelements.forEach((item)=> observer.observe(item));
    spans.forEach((item)=> observer.observe(item));
    spans2.forEach((item)=> observer.observe(item));

  return (
    <>
        <div className='section relative overflow-hidden'>
            <div onMouseEnter={()=>{setSpanSet1('growspan1')}} onMouseLeave={()=>{setSpanSet1('')}} className='mb-32'>
                <div className='hide'>
                    <Image className='mr-4 md:mr-10' src = '/assets/svgs/cart.svg' width={100} height={100} alt='cart' />
                </div>
                <div className='hide rounded-xl p-2 mb-8 bg-white md:bg-transparent'>
                    <h2 className='tsubtitle'> Mechanical Tests </h2>
                    <p className='tbase mb-3'> A variety of mechanical test charts available </p>
                </div>
                <div className='gridcont w-full md:w-[60%]'>
                    <div className='hide'><Image src='/assets/svgs/tensile.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Tensile Test </h2></div>
                    <div className='hide'><Image src='/assets/svgs/hardness.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Hardness Test </h2></div>
                    <div className='hide'><Image src='/assets/svgs/impact.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Impact Test </h2></div>
                    <div className='hide'><Image src='/assets/svgs/flexural.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Flexural Test </h2></div>
                </div>
            </div>


        <div onMouseEnter={()=>{setSpanSet2('growspan2')}} onMouseLeave={()=>{setSpanSet2('')}} className='flex flex-row justify-end items-center'>
            <div className='w-max md:w-1/2'>
            <div className='other'>
                <Image className='mr-4 md:mr-10' src = '/assets/svgs/search.svg' width={100} height={100} alt='cart' />
            </div>
            <div className='other rounded-xl p-2 mb-8 bg-white md:bg-transparent'>
                <h2 className='tsubtitle'> Ease of Search </h2>
                <p className='tbase mb-3 mr-0'> Find your charts easily by searching for type of tests, date of creation, name of x and y axes or chart title </p>
            </div>
            <div className='w-full md:w-[60%]'>
                <Image className='other' src = '/assets/svgs/charts.svg' width={740} height={440} alt='charts'/>
            </div>
            </div>
        </div>
        {/* MOVING SPANS */}
        <div  className='z-[-1] absolute top-0 left-0 w-full h-1/2'>
                <div className='animespans1 ml-[60%] '>
                    <span className='span span-1'></span>
                    <span className='span span-2'></span>
                    <span className='span span-3'></span>
                    <span className='span span-4'></span>
                </div>
            </div>
            <div  className='z-[-1] absolute bottom-0 left-0 w-full h-1/2'>
                <div className='animespans2 mr-[40%] '>
                    <span className='span_second span-1'></span>
                    <span className='span_second span-2'></span>
                    <span className='span_second span-3'></span>
                    <span className='span_second span-4'></span>
                    <span className='span_second span-5'></span>
                    <span className='span_second span-6'></span>
                    <span className='span_second span-7'></span>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default Spans