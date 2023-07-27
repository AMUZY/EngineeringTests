'use client'
import React , { useReducer, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

let firstname = '';
let lastname = '';
let email = '';
let password = '';
let confirmpassword = '';

const UPDATEINFO = {
  FIRSTNAME : 'firstname',
  LASTNAME : 'lastname',
  EMAIL : 'email',
  PASSWORD : 'password',
  CONFIRMPASSWORD : 'confirmpassword',
}

function reducer(state,action){
  switch(action.type){
    case UPDATEINFO.FIRSTNAME : {
      return {...state, firstname : action.payload}
    }
    case UPDATEINFO.LASTNAME : {
      return {...state, lastname : action.payload}
    }
    case UPDATEINFO.EMAIL : {
      return {...state, email : action.payload}
    }
    case UPDATEINFO.PASSWORD : {
      return {...state, password : action.payload}
    }
    case UPDATEINFO.CONFIRMPASSWORD : {
      return {...state, confirmpassword : action.payload}
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

const signup = () => {
  const [user,dispatch] = useReducer(reducer, {firstname, lastname, email, password, confirmpassword})
  const [iseyeopen,setIsEyeOpen] = useState(false);
  const [iseye2open,setIsEye2Open] = useState(false)
  const [ptype,setPType] = useState('password')
  const [ptype2,setPType2] = useState('password')

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
        <Link className='w-max flex flex-row items-center hover:scale-125 transition-all' href={'/'}> 
          <Image src='/assets/svgs/backarrow.svg' width={40} height={42} alt='engineeringtests logo transparent' /> 
          <h3 className='hidden tbase text-white lg:inline'>Go back </h3>
        </Link>
      </div>
      <div className='w-full flex flex-row'>
        <div className='hidden lg:block w-1/2'>
          <Image src='/assets/images/ET_trans.png' width={622} height={722} alt='engineeringtests logo transparent' />
        </div>

        <div className='w-full lg:w-1/2'>
          <h1 className='ttitle text-white text-center'> Create account </h1>

          <form onSubmit={handleSubmit} className='my-3 flex flex-col'>
            <div className={container}>
              <label className={labelclass} htmlFor='firstname'> First name :</label>
              <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.FIRSTNAME , payload : e.target.value})}} type='text' id='firstname' placeholder='your firstname' value={user.firstname} />
            </div>
            <div className={container}>
              <label className={labelclass} htmlFor='lastname'> Last name : </label>
              <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.LASTNAME , payload : e.target.value})}} type='text' id='lastname' placeholder='your lastname' value={user.lastname} />
            </div>
            <div className={container}>
              <label className={labelclass} htmlFor='email'> Email : </label>
              <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.EMAIL , payload : e.target.value})}} type='text' id='email' placeholder='e.g ofordileyoungproff@yahoo.com' value={user.email} />
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
            <div className={container}>
              <label className={labelclass} htmlFor='confirmpassword'> Confirm Password :</label>
              <div className='relative w-full md:flex-grow md:w-auto flex'>
                <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.CONFIRMPASSWORD , payload : e.target.value})}} type={ptype2} id='confirmpassword' placeholder='confirm password ' value={user.confirmpassword} />
                <Image onClick={()=>{
                  hash(ptype2,setPType2); 
                  user.confirmpassword.trim().length >= 1 &&  setIsEye2Open(!iseye2open)
                  }} className={eyeclass} src={iseye2open? '/assets/svgs/eyeopen.svg' : '/assets/svgs/eyeclose.svg'} width={20} height={20} alt='eye icon' />
              </div>
            </div>
            <button onClick={handleSubmit} className='my-3 mx-auto fill w-full md:w-max'>
              Create account
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

// let login = document.getElementById("login")
// let popup = document.getElementById("bg-blur")
// let check = document.getElementById("check")
// let password = document.getElementById("password")

// // Clicking login button and opening modal
// login.addEventListener("click", () => {
//     popup.classList.toggle("hidden")
// })
// // closing modal
// popup.addEventListener("click", (e) => {
//     if (e.target.className.includes("bg-blur")) {
//         popup.classList.toggle("hidden")
//     }
//     e.stopPropagation()
// })

// // show password
// check.addEventListener("click", () => {
//     if (password.type == "text") {
//         password.type = "password"
//     } else {
//         password.type = "text"
//     }
// })

export default signup