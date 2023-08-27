'use client'
import React from 'react'
import RightPane from '@components/RightPane'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useState } from 'react'
import axios from 'axios'
import { promisetoast } from '@toasts/Toasts';
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Dashboard = () => {
  const [projects,setProjects] = useState([])
  const {data : session} = useSession()
  const [sess,setSess] = useState()
  // DO NOT DELETE SESS
  
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



  useEffect(()=>{
    if((session?.user._id && !sess) || (session?.user.id && !sess)){
      const fetchProjects = new Promise(async (res,rej)=>{
        await axios.get(`/api/project/other-http/${session?.user._id || session?.user.id}/undefined`)
        .then((response)=> {
            const data = response.data
            setProjects(data)
            res()
        })
        .catch((error)=>{ console.log(error) })
        rej()
    })
    
    promisetoast(fetchProjects,
    "Fetching results...",
    "Results fetched",
    "Failed to fetch results, please refresh or check your internet" )

    setSess(session)
    }
    
  },[])
  
  return (
    authstate && 
    <>
      <ToastContainer /> 
      <RightPane pagename = "All Results" homepageProjects={projects}/>
    </>
  )
}

export default Dashboard

