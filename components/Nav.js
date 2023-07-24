import React from 'react'
import { FillBtn } from './Button'
import Image from 'next/image'

const Nav = () => {
  return (
    <div className='top-0 left-0 w-full px-[5%] lg:px-[10%] py-[12px] flex justify-between items-center'>
      <Image className='opacity-0 md:opacity-100' src = '/assets/svgs/logo.svg' width={30} height={32} alt='logo icon' />
      <div>
        <button className='tbase text-black mx-3'> FAQ </button>
        <FillBtn text = 'Sign Up' addclass='mx-2' />
      </div>
    </div>
  )
}

export default Nav