'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const layout = ({children}) => {
  const [authstate,setAuthState] = useState(false)
  const router = useRouter()
  function CheckAuth(){
    const session = getSession()
    session.then((status)=>{
      if(!status){
        router.push("/unauthenticated")
      }else{
        setAuthState(true)
      }
    }).catch(()=>{})
  }
  CheckAuth()


  return (
    authstate && 
      <div className='w-full h-full'>
        <SessionProvider>
          {children}
        </SessionProvider>
      </div>
  )
}

export default layout