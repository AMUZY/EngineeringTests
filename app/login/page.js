'use client'
import React , { useReducer,useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

let email, password = '';

const UPDATEINFO = {
  EMAIL : 'email',
  PASSWORD : 'password',
}

function reducer(state,action){
  switch(action.type){
    case UPDATEINFO.EMAIL : {
      return {...state, email : action.payload}
    }
    case UPDATEINFO.PASSWORD : {
      return {...state, password : action.payload}
    }
  }
}

const handleSubmit =(e)=>{
  e.preventDefault()
  console.log('submit button clicked')
}

const container = 'relative flex flex-col md:flex-row items-start md:items-center justify-between my-2 lg:my-4';
const labelclass = 'bg-transparent tbase text-white mb-2 mr-4 md:mb-0 lg:mr-12';
const inputclass = 'input bg-transparent w-full md:w-auto tbase text-white focus:outline-none flex-grow border-white border-[1px] py-1 px-2 lg:py-3 lg:px-4 rounded-md';
const eyeclass = 'absolute top-1/2 right-[8px] -translate-x-1/2 -translate-y-1/2';

const login = () => {
  const [user,dispatch] = useReducer(reducer, {email, password})
  const [iseyeopen,setIsEyeOpen] = useState(false);
  const [ptype,setPType] = useState('password')

  const hash =(state,newstate)=>{
    if(state == 'password'){
      newstate('text')
    }
    else{
      newstate('password')
    }
  }

  return (
    <section className="min-h-[100svh] section bluegradient flex flex-col">
      <div className='flex flex-row justify-start'>
        <Link className='p-2 w-max flex flex-row items-center hover:scale-125 transition-all' href={'/'}> 
          <Image src='/assets/svgs/backarrow.svg' width={40} height={42} alt='engineeringtests logo transparent' /> 
          <h3 className='hidden tbase text-white lg:inline'>Go back </h3>
        </Link>
      </div>
      <div className='w-full flex flex-row'>
        <div className='hidden lg:block w-1/2'>
          <Image className='hover:scale-105 transition-all' src='/assets/images/ET_trans.png' width={622} height={722} alt='engineeringtests logo transparent' />
        </div>

        <div className='w-full lg:w-1/2'>
          <h1 className='ttitle text-white text-center'> Login </h1>

          <form onSubmit={handleSubmit} className='my-3 flex flex-col'>
            <div className={container}>
              <label className={labelclass} htmlFor='email'> Email : </label>
              <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.EMAIL , payload : e.target.value})}} type='text' id='email' placeholder='e.g ofordile@proff.com' value={user.email} />
            </div>
            <div className={container}>
              <label className={labelclass} htmlFor='password'> Password : </label>
              <div className='relative w-full md:flex-grow md:w-auto flex'>
                <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.PASSWORD , payload : e.target.value})}} type={ptype} id='password' placeholder='enter password' value={user.password} />
                <Image onClick={()=>{
                  hash(ptype,setPType); 
                  user.password.trim().length >= 1 && setIsEyeOpen(!iseyeopen)
                  }} className={eyeclass} src={iseyeopen? '/assets/svgs/eyeopen.svg' : '/assets/svgs/eyeclose.svg'} width={20} height={20} alt='eye icon' />
              </div>
            </div>
            <button onClick={handleSubmit} className='my-3 mx-auto fill w-full md:w-max'>
              Login
            </button>
          </form>

          <h3 className='tbase text-white text-center'> or </h3>
          <div className='py-2 mt-1 w-full flex flex-col items-center'>
            <button onClick={()=>{}} className='my-2 mx-auto'><Image src='/assets/svgs/googlebtn.svg' width={345} height={54} alt='sing in with google' /></button>
            <button onClick={()=>{}} className='my-2 mx-auto'><Image src='/assets/svgs/linkedinbtn.svg' width={345} height={54} alt='sing in with linkedin' /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default login