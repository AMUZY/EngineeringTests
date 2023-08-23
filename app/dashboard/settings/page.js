'use client'
import React, { useState,useReducer } from 'react'
import RightPane from '@components/RightPane'
import { container,labelclass,inputclass } from '@app/signup/page';
import Image from 'next/image';
import { SaveBtn } from '@components/Button';
import { useSession } from 'next-auth/react';

let password = "";
let confirmpassword = "";

const UPDATEINFO = {
  PASSWORD: "password",
  CONFIRMPASSWORD: "confirmpassword",
};

function reducer(state, action) {
  switch (action.type) {
    case UPDATEINFO.PASSWORD: {
      return { ...state, password: action.payload };
    }
    case UPDATEINFO.CONFIRMPASSWORD: {
      return { ...state, confirmpassword: action.payload };
    }
  }
}

const hide = (state, newstate) => {
  if (state == "password") {
    newstate("text");
  } else {
    newstate("password");
  }
};

const settings = () => {
  const {data : session} = useSession()
  const [user, dispatch] = useReducer(reducer, {
    password,
    confirmpassword,
  });
  const [color,setColor] = useState("")
  const [active,setActive] = useState(false)
  const [iseyeopen, setIsEyeOpen] = useState(false);
  const [iseye2open, setIsEye2Open] = useState(false);
  const [ptype, setPType] = useState("password");
  const [ptype2, setPType2] = useState("password");

  const UpdatePassword =()=>{
    if(user.password === user.confirmpassword){

    }
  }
  

  const settingsDiv = <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl bg-white">
    {/* SET DASHBOARD THEME */}
    <div className='flex flex-col my-2'>
      <h2 className='tbasebold black my-3'> Dashboard theme :</h2>
      <div className='mx-auto rounded-2xl px-6 py-3 my-3 bg-gray-300 flex'>
        <div className='flex items-center'>
          <h2 className='mx-3 tbase'>Default :</h2>
          <input type='color' className='style2 rounded-full mx-2' onChange={(e)=>{}} />
        </div>
        <div className='flex items-center'>
          <h2 className='mx-3 tbase'>Custom : </h2>
          <div className='cursor-pointer rounded-full bg-gradient-to-tr from-gray-500 via-pink-400 via-purple-500 via-green-200 via-yellow-100 to-red-500 w-10 h-10'>
            {/* <input type='color' className='style2 rounded-full mx-2' onChange={(e)=>{setColor(e.target.value)}} value={"#FF6700"}/> */}
          </div>
        </div>
      </div>
    </div>
    {
      session?.user.password && 
      <div className='flex flex-col my-2'>
        <h2 className='tbasebold black my-3'> Change Password :</h2>
        <div className='mx-auto rounded-3xl px-6 py-3 my-3 bluegradient flex flex-col'>
              <div className={container}>
                <label className={labelclass} htmlFor="password">
                  {" "}
                  New Password :{" "}
                </label>
                <div className="relative pwordcont w-full md:flex-grow md:w-auto flex">
                  <input
                    className={inputclass}
                    required
                    onChange={(e) => {
                      dispatch({
                        type: UPDATEINFO.PASSWORD,
                        payload: e.target.value,
                      });
                    }}
                    type={ptype}
                    id="password"
                    placeholder="enter password"
                    value={user.password}
                  />
                  <Image
                    className="cursor-pointer"
                    onClick={() => {
                      hide(ptype, setPType);
                      user.password.trim().length >= 1 &&
                        setIsEyeOpen(!iseyeopen);
                    }}
                    src={
                      iseyeopen
                        ? "/assets/svgs/eyeopen.svg"
                        : "/assets/svgs/eyeclose.svg"
                    }
                    width={20}
                    height={20}
                    alt="eye icon"
                  />
                </div>
              </div>
              <div className={container}>
                <label className={labelclass} htmlFor="confirmpassword">
                  {" "}
                  Confirm New Password :
                </label>
                <div className="relative pwordcont w-full md:flex-grow md:w-auto flex">
                  <input
                    className={inputclass}
                    required
                    onChange={(e) => {
                      dispatch({
                        type: UPDATEINFO.CONFIRMPASSWORD,
                        payload: e.target.value,
                      });
                    }}
                    type={ptype2}
                    id="confirmpassword"
                    placeholder="confirm password "
                    value={user.confirmpassword}
                  />
                  <Image
                    className="cursor-pointer"
                    onClick={() => {
                      hide(ptype2, setPType2);
                      user.confirmpassword.trim().length >= 1 &&
                        setIsEye2Open(!iseye2open);
                    }}
                    src={
                      iseye2open
                        ? "/assets/svgs/eyeopen.svg"
                        : "/assets/svgs/eyeclose.svg"
                    }
                    width={20}
                    height={20}
                    alt="eye icon"
                  />
                </div>
              </div>
              <div className='w-full'>
                <SaveBtn addclass={"mx-auto my-3"} text={"Update"} action={()=>{
                  UpdatePassword()
                }}/>
              </div>
        </div>
      </div>
    }
  </div>
  

  return (
    session &&
    <RightPane pagename="Settings" settings={settingsDiv}/>
  )
}

export default settings