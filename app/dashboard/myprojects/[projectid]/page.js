'use client'
import React from 'react'
import RightPane from '@components/RightPane'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { useState,useEffect } from 'react';
import { promisetoast } from '@toasts/Toasts';


const page = ({params}) => {
  const [project,setProject] = useState()
  const {data : session} = useSession()
  const [sess,setSess] = useState()

  useEffect(()=>{
    if((session?.user._id && !sess) || (session?.user.id && !sess)){
      const fetchProjects = new Promise(async (res,rej)=>{
        await axios.get(`/api/project/other-http/${session?.user._id || session?.user.id}/${params.projectid}`)
        .then((response)=> {
            const data = response.data
            setProject(data)
            res()
        })
        .catch((error)=>{ 
          rej()
        })
    })
    
    promisetoast(fetchProjects,
    "Getting project info",
    "Project info fetched",
    "Failed to fetch project info, please refresh or check your internet" )

    setSess(session)
    }
    
  },[session])



  return (
    <>
      <ToastContainer />
      <RightPane pagename="My Projects" projectPageInfo={project}/>
    </>
  )
}

export default page