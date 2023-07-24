import React from 'react'
import Image from 'next/image'
import { FillBtn,NoFillBtn } from '@components/Button'
import Card from '@components/Card'
import Spans from '@components/Spans'

const Home = () => {
  return (
    <section className='overflow-hidden'>
      <section className='section h-[100svh] flex flex-col md:flex-row justify-evenly items-center bluegradient'>
        {/* INTRO DIV */}
        <div className='flex flex-col justify-start w-full mb-32 md:mb-0 md:w-1/2 p-2 m-0'> 
          <div className='mt-0 mb-16 md:mb-24'>
            <div className='flex flex-col md:flex-row md:flex-wrap'>
              <div className='block md:flex'>
                <h1 className='dorange ttitle'>Engineering</h1>
                <h1 className='white ttitle'>Tests</h1>
              </div>
              <Image className='mr-2 md:mx-2 order-first md:order-3' src = '/assets/svgs/logo.svg' width={45} height={48} alt = 'logo icon'/>
            </div>
            <p className='tsubtitle white my-2'>
              create, store and manage all your 
              mechanical test results from one place
            </p>  
          </div>
          <div className='flex flex-row flex-wrap md:justify-between md:items-center w-max'>
            <FillBtn text = 'Create an account' />
            <h1 className='tbase white mx-4 my-2 md:mx-8'> or </h1>
            <NoFillBtn text = 'Sign In' />
          </div>
        </div>
        {/* IMAGES */}
        <div className='flex flex-col w-full hidden md:block md:w-1/2'>
          <Image className='mr-4 md:mr-10' src = '/assets/images/barchart.png' width={700} height={400} alt='barchart' />
          <Image className='ml-4 md:ml-10' src = '/assets/images/linechart.png' width={700} height={400} alt='linechart' />
        </div>
      </section>
      
      
      <section className='h-max'>
        <Spans />
      </section>

      <section className='px-[5%] md:px-[10%] py-16 md:py-24'>
        <div className='cardgrid'>
          <Card addclass='other' src='/assets/svgs/chart_emoji.svg' sub='Pick a chart' para='Choose any of the preset test charts available or create your own custom chart' />
          <Card addclass='hide' src='/assets/svgs/pencil.svg' sub='Fill in data' para='Fill in your data set for both x and y axes' />
          <Card addclass='other' src='/assets/svgs/greencheck.svg' sub='Save on-the-go' para="Don't forget to click save as you fill" />
          <Card addclass='hide' src='/assets/svgs/download.svg' sub='Download and share' para='Download as image to share with colleagues, prepare presentations and much more' />
        </div>
        <div className='mt-10 lg:mt-20 flex justify-center items-center'>
          <FillBtn text='Get started' />
        </div>
      </section>
      
      <section className='flex justify-center'>
          <video className='video' loop autoPlay muted playsInline>
              <source src = '/assets/videos/ET_1920.mp4' type='video/mp4' />
          </video>
      </section>

      <section className='h-[100svh] section bluegradient'>

      </section>
  
    </section>
  )
}

export default Home