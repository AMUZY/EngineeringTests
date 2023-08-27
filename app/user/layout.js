'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const layout = ({children}) => {
  return (
      <div className='w-full h-full'>
        <SessionProvider>
          {children}
        </SessionProvider>
      </div>
  )
}

export default layout