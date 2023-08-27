'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Unauthenticated = () => {
    const router = useRouter()
    setTimeout(()=>{
        router.push("/user/login")
    }, 2000)

  return (
    <div className='w-full h-full flex items-center justify-center'>
        <h2 className='text-center mx-auto my-auto'>
        Unauthenticated, you should login to view this page
        </h2>
    </div>
  )
}

export default Unauthenticated