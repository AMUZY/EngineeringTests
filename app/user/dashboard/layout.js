'use client'
import React, { useState } from "react";
import ProfileNav from "@components/ProfileNav";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function layout ({ children }) {
  const [authstate,setAuthState] = useState(false)
  const router = useRouter()
  
  const [localstore,setLocalStore] = useState()
  useEffect(()=>{
    setLocalStore(localStorage)
  },[])
  
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
    (authstate && localstore) &&
      <div className="w-full h-full p-6">
        <div className="w-full boxcontainer h-full flex flex-row rounded-3xl overflow-visible">
          <div className="mr-3 w-[20%] dashbox rounded-3xl p-3">
            <ProfileNav />
          </div>
          <div style={{backgroundColor : localstore ? localstore.getItem("backgroundColor") : 'currentcolor'}} className="colbox ml-3 overflow-y-scroll flex-grow dashbox rounded-3xl p-3">
            <div className="min-h-full flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>
  );
};

