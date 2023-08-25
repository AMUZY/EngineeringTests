'use client'
import React, { useState,useReducer, useEffect } from 'react'
import RightPane from '@components/RightPane'
import { container,labelclass,inputclass } from '@app/signup/page';
import Image from 'next/image';
import { SaveBtn } from '@components/Button';
import { useSession } from 'next-auth/react';
import { CirclePicker } from 'react-color';

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
  const [localstore,setLocalStore] = useState()
  const [color,setColor] = useState("#ffff")
  const [active,setActive] = useState(false)
  const [iseyeopen, setIsEyeOpen] = useState(false);
  const [iseye2open, setIsEye2Open] = useState(false);
  const [ptype, setPType] = useState("password");
  const [ptype2, setPType2] = useState("password");

  useEffect(()=>{
    setColor(localStorage.getItem("backgroundColor"))
    setLocalStore(localStorage)
  },[])

  // BG COLOR CHANGER
  const ChangeUiColor = (color)=>{
    setColor(color)
    // STORE IN LOCAL STORAGE
    localStorage.setItem('backgroundColor', color)
    const elements = document.querySelectorAll(".colbox")
    elements.forEach(element => {
      element.style.backgroundColor = color
    });
  }

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
          <div style={{width : 40 , height : 40}} className='cursor-pointer bckblue rounded-full' onClick={()=>ChangeUiColor("rgba(36,52,112,0.8)")}></div>
        </div>
        <div className='flex items-center'>
          <h2 className='mx-3 tbase'>Custom : </h2>
          <input type='color' className='style2' value={color} onChange={(e)=>ChangeUiColor(e.target.value)}/>
        </div>
      </div>
    </div>
    {
      session?.user.password && 
      <div className='flex flex-col my-2'>
        <h2 className='tbasebold black my-3'> Change Password :</h2>
        <div style={{backgroundColor : localstore ? localstore.getItem("backgroundColor") : 'currentcolor'}} className='mx-auto rounded-3xl px-6 py-3 my-3 bluegradient flex flex-col'>
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