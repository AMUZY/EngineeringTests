'use client'
import React from 'react'

import { useEffect } from 'react'

const error = ({error, reset}) => {
  useEffect(()=>{
    console.error(error)
  },[error])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <h2 className='my-3'> Something went wrong! </h2>
        <button onClick={()=>
          // Attempt to recover by trying to re render the segment
          reset()
        }>
          Try Again
        </button>
        <p className='my-2'> or </p>
        <button onClick={()=>
          window.history.back()
        }>
          Return
        </button>
    </div>
  )
}

export default error