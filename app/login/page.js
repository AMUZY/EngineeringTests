'use client'
import React , { useReducer,useState,useEffect } from 'react'
import Image from "next/image"
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { signIn,getProviders } from 'next-auth/react';
import { normaltoast, promisetoast, successtoast } from '@toasts/Toasts';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { loginUser } from '@helpers/helper';


let email = '';
let password = '';

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


const container = 'relative flex flex-col md:flex-row items-start md:items-center justify-between my-2 lg:my-4';
const labelclass = 'nohighlight bg-transparent tbase text-white mb-2 mr-4 md:mb-0 lg:mr-12';
const inputclass = 'input bg-transparent w-full md:w-auto tbase text-white focus:outline-none flex-grow py-1 px-2 lg:py-3 lg:px-4';

const login = () => {
  const router = useRouter()
  const [submiterror, setSubmitError] = useState();
  const [user,dispatch] = useReducer(reducer, {email, password})
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState(null);
  const [iseyeopen,setIsEyeOpen] = useState(false);
  const [ptype,setPType] = useState('password')

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setAllProviders();
  }, []);

  const hide =(state,newstate)=>{
    if(state == 'password'){
      newstate('text')
    }
    else{
      newstate('password')
    }
  }

  
const handleSubmit = async (email,password)=>{
  if(email && password){
    setLoading(true)

    const AwaitUserLogin = new Promise(async (res, rej)=> {
      await axios.get(`/api/user-http/${email}/${password}`)
      .then((response)=>{
          // Go to dashboard
          const loginRes = async () => {
          const login = await loginUser({
            email: email,
            password: password,
          }).catch((error)=>{throw new Error(error)} );
    
          if (login && !login.ok) {
            setSubmitError(login.error || "");
          } else {
            router.push("/");
          }
        };
        loginRes();
        res()
        setLoading(false);
      }).catch((error)=>{
          rej()
          setLoading(false);
      })
    })

    promisetoast(AwaitUserLogin,
    "Logging in...",
    "Logged In successfully, preparing your dashboard...",
    "Failed to login")

  }
 
}

  return (
    <section className="min-h-[100svh] section bluegradient flex flex-col">
      <div className='flex flex-row justify-start'>
      <button className='p-2 w-max flex flex-row items-center hover:scale-125 transition-all' onClick={()=> router.push("/") }> 
          <Image style={{width : "auto"}} src='/assets/svgs/backarrow.svg' width={40} height={42} alt='engineeringtests logo transparent' /> 
          <h3 className='hidden tbase text-white lg:inline'>Go back </h3>
      </button>
      </div>
      <div className='w-full flex flex-row'>
        <div className='hidden lg:block w-1/2'>
          <Image style={{width : "auto"}} className='hover:scale-105 transition-all' src='/assets/images/ET_trans.png' width={622} height={722} alt='engineeringtests logo transparent' />
        </div>

        <div className='w-full lg:w-1/2'>
          <h1 className='ttitle text-white text-center'> Login </h1>

          <form onSubmit={(e)=>{e.preventDefault() ; handleSubmit(user.email,user.password)}} className='my-3 flex flex-col'>
            <div className={container}>
              <label className={labelclass} htmlFor='email'> Email : </label>
              <div className='relative pwordcont w-full md:flex-grow md:w-auto flex'>
                <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.EMAIL , payload : e.target.value})}} type='text' id='email' placeholder='e.g ofordile@proff.com' value={user.email} />
              </div>
            </div>
            <div className={container}>
              <label className={labelclass} htmlFor='password'> Password : </label>
              <div className='relative pwordcont w-full md:flex-grow md:w-auto flex'>
                <input className={inputclass} required onChange={(e)=>{dispatch({type : UPDATEINFO.PASSWORD , payload : e.target.value})}} type={ptype} id='password' placeholder='enter password' value={user.password} />
                <Image style={{width : "auto"}} onClick={()=>{
                  hide(ptype,setPType); 
                  user.password.trim().length >= 1 && setIsEyeOpen(!iseyeopen)
                  }} src={iseyeopen? '/assets/svgs/eyeopen.svg' : '/assets/svgs/eyeclose.svg'} width={20} height={20} alt='eye icon' />
              </div>
            </div>
            <div className='flex flex-col items-center md:flex-row mx-auto w-max '>
              <p onClick={()=>{}} className={`nohighlight cursor-pointer my-3 tbase text-white text-center mx-3 hover:text-[#FF6700] md:w-max`}>
                  Forget password?
              </p>
              <button 
                disabled={loading}
                onClick={()=>handleSubmit(user.email,user.password)} className={`my-3 mx-auto fill w-full md:w-max  ${
                loading
                  ? "border-gray-500 bg-gray-500 text-gray-400 hover:bg-gray-500 hover:text-gray-400 cursor-not-allowed"
                  : "cursor-pointer"
                }`}>
                Login
              </button>
              <ToastContainer />
            </div>
          </form>

          <h3 className='tbase text-white text-center'> or </h3>
          <div className='py-2 mt-1 w-full flex flex-col items-center'>
            <button onClick={()=>{
                signIn(providers.google.id, {
                callbackUrl: `/dashboard/home`,
              });
            }} className='my-2 mx-auto'><Image style={{width : "auto"}} src='/assets/svgs/googlebtn.svg' width={345} height={54} alt='sing in with google' /></button>
            <button onClick={()=>{
                signIn(providers.linkedin.id, {
                callbackUrl: `/dashboard/home`,
              });
            }} className='my-2 mx-auto'><Image style={{width : "auto"}} src='/assets/svgs/linkedinbtn.svg' width={345} height={54} alt='sing in with linkedin' /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default login