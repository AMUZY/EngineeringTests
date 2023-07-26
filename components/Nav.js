import React from 'react'
import { FillBtn } from './Button'
import Image from 'next/image'


const Nav = ({ScrollToTitle}) => {
  return (
    <div className='fixed bg-white z-10 top-0 left-0 w-full px-[5%] lg:px-[10%] py-[12px] flex justify-between items-center'>
      <Image className='opacity-0 md:opacity-100' src = '/assets/svgs/logo.svg' width={30} height={32} alt='logo icon' />
      <div>
        <button onClick={()=>{ScrollToTitle('FAQ')}} id='faq' className={`tbase text-[#00000] mx-3 hover:text-[#FF6700]`}> FAQ </button>
        <FillBtn href={'/signup'} text = 'Sign Up' addclass='mx-2' />
      </div>
    </div>
  )
}

export default Nav