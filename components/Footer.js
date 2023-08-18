import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import links from '@links.json'

const Footer = () => {
  return (
    <div className='mb-16 mx-auto flex flex-col'>
      <div className='mt-16 mb-32 px-auto flex flex-col lg:flex-row lg:justify-evenly w-full'>
        {/* CONTACT US DIV */}
        <div className='w-full lg:w-[30%]'>
          <div className='w-full'>
              <h1 id='FAQ' className='nohighlight ttitle grey text-left'> Contact Us </h1>
          </div>
          <div className='mt-8 w-full'>
            <h3 className='tsubtitle grey my-2'>Have questions for us?</h3>
            <p className='tbase grey my-2'>Please leave us a message using one of our social media platforms provided below :</p>
            <div className='w-max mt-5 flex justify-between'>
              <Link
                target="_blank"
                rel="noreferrer"
                href={links['lkdn']}
                className='mr-3'
                ><Image src='/assets/svgs/linkedin.svg' width={30} height={30} alt='linkedin icon'/></Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href={links['mail']}
                className='mr-3'
                ><Image src='/assets/svgs/mail.svg' width={30} height={30} alt='mail icon'/></Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href={links['tw']}
                className='mr-3'
                ><Image src='/assets/svgs/twitter.svg' width={30} height={30} alt='twitter icon'/></Link>
            </div>
          </div>
        </div>
        {/* LINKS DIV */}
        <div className='w-full lg:w-[30%] flex flex-col justify-between items-start lg:items-center mt-12 lg:my-4'>
          <h2 className='grey tsubtitle text-left lg:text-center'> Links </h2>
          <Link className='my-2 grey tbase text-left lg:text-center underline hover:no-underline hover:text-[#FF6700]' href={'/'}> Home </Link>
          <Link className='my-2 grey tbase text-left lg:text-center underline hover:no-underline hover:text-[#FF6700]' href={'/signup'}> Sign Up </Link>
          <Link className='my-2 grey tbase text-left lg:text-center underline hover:no-underline hover:text-[#FF6700]' href={'/login'}> Sign In </Link>
        </div>
        {/* LOGO AND MOTTO DIV */}
        <div className='w-full lg:w-[30%] flex flex-col justify-between items-center mt-12 lg:my-4'>
          <Image src='/assets/svgs/footerlogo.svg' width={86} height={86} alt='footer logo' />
          <p className='tsubtitle text-left lg:text-center grey my-2'>EngineeringTests</p>
          <p className='tbase text-center lg:text-center grey my-2'>Create, store and manage your engineering test results</p>
        </div>
      </div>
      {/* COPYRIGHT DIV */}
      <div className='mx-auto flex flex-col justify-center order-1 lg:order-2'>
        <p className='tbase grey my-2 text-center'>Copyright © 2023 EngineeringTests, Inc</p>
        <Link href={'/privacy'} className='tbase grey my-2 text-center underline hover:no-underline hover:text-[#FF6700]'>Privacy Policy</Link>
      </div>
    </div>
  );
}

export default Footer