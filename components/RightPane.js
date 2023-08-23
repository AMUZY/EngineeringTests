"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {v4 as uuidv4} from 'uuid'
import { useRouter } from "next/navigation";
import ResultInfo from "./ResultInfo";
import ProjectInfo from "./ProjectInfo";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { CanDelBtn, FillBLueBtn, FillBtn } from "./Button";
import TwoBtnModal from "@components/TwoBtnModal";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { promisetoast } from "@toasts/Toasts";
import axios from "axios";

const RightPane = ({ pagename, results, homepageProjects ,projects, resultinfo, projectinfo, projectPageInfo , settings}) => {
  const {data : session} = useSession()
  const router = useRouter()
  const [sess,setSess] = useState(session)
  const [modal,setModal] = useState(false)
  const [resultsshow,setResultsShow] = useState(false)
  const [warningheading,setWarningHead] = useState('');
  const [warning,setWarning] = useState('');
  const action = `Yes, I'm sure`;

  // SEARCHED ITEMS TO USE FOR INDIVIDUAL PAGES
  const [incomingItems,setIncomingItems] = useState([])
  const [searchedItems,setSearchedItems] = useState([])
  // END

  // BELOW USEFFECT TO setIncomingItems ACCORDING TO PAGE IN USE
  useEffect(()=>{
    if(homepageProjects){
      let temparray = []
      for(let i = 0 ; i < homepageProjects.length ; i++){
        for(let j = 0 ; i < homepageProjects[i].length ; j++){
          temparray.push(homepageProjects[i].results[j])
        }
      }
      setIncomingItems(temparray)
    }else if(projects){
      let temparray = []
      for(let i = 0; i < projects.length ; i++){
        temparray.push(projects[i])
      }
      setIncomingItems(temparray)
    }
  },[homepageProjects,projects])
  // 

  console.log(incomingItems)


  function UpdateList(item){
    if(homepageProjects || projects){
      const tempSearchedArray = incomingItems.filter((inItem)=>{
        return (
          inItem.title === item.title
        )
      })
      setSearchedItems(tempSearchedArray)
    }
    }
  }

  const ShowModal = ()=>{
    setModal(true)
  }
  const CloseModal = ()=>{
    setModal(false)
  }

  const DelResult=()=>{
    const AwaitResultDelete = new Promise (async (res , rej)=>{
      await axios.put(`/api/project/other-http/${session?.user._id || session?.user.id}/${projectinfo._id}`,
      {
        id : resultinfo.id,
        delete : true
      }
      ).then(()=>{
          res()
          router.push(`/dashboard/home`)
      }).catch(()=>{
          rej()
      })
  })

  promisetoast(
      AwaitResultDelete,
      "Deleting result...",
      "Result deleted successfully",
      "Couldn't delete result"
      )
  }

  const DelProject=()=>{
    const AwaitProjectDelete = new Promise(async (res,rej)=>{
      await axios.delete(`/api/project/other-http/${session?.user._id || session?.user.id}/${projectPageInfo._id}`)
      .then(()=>{
        res()
        router.push('/dashboard/home')
      }).catch(()=>{
        rej()
      })
    })

    promisetoast(AwaitProjectDelete,
      "Deleting project...",
      "Project deleted successfully",
      "Couldn't delete project")
  }


  useEffect(()=>{
    if(homepageProjects){
      for(let i = 0; i < homepageProjects.length ; i++){
          if(homepageProjects[i].results.length > 0){
            setResultsShow(true)
          }
      }
    }
  },[homepageProjects])
  

  const [searchval, setSearchVal] = useState("");
  return (
    <div className="w-full h-full flex flex-col p-1">
    <ToastContainer />
    {modal ? <TwoBtnModal warningheading ={warningheading} warning={warning} action={action} modal={modal} ShowModal={ShowModal} CloseModal={CloseModal} MainAction={warningheading === 'Delete Result' ? DelResult : DelProject}/> : null}
      <div className="flex items-center justify-between h-[10%] mb-2 rounded-2xl bg-white p-2">
        <div className="flex flex-row items-center">
          <button
            className="p-2 w-max flex flex-row items-center hover:scale-125 transition-all"
            onClick={() => {
              window.history.back();
            }}
          >
            <Image
              src="/assets/svgs/backarrow_black.svg"
              width={40}
              height={42}
              alt="engineeringtests logo transparent"
            />
          </button>
          {/* PAGE TITLE AND CHILDREN TITLES */}
          <div className="flex items-center">
            {
              pagename && (
                <p className="tsubtitle black">{pagename}</p>
              )
            }
            {
              (projectPageInfo) && (
                <p className="tbase black mx-1 text-gray-500 overflow-ellipsis">{` > ${projectPageInfo.title}`}</p>
              )
            }
            {
              resultinfo && (
                <>
                  <p className="tbase black mx-1 text-gray-500 overflow-ellipsis">{` > ${projectinfo.title} >`}</p>
                  <p className="tbase mx-1 text-gray-500 overflow-ellipsis">{`${resultinfo.title}`}</p>
                </>
              )
            }
          </div>
        </div>
        {
          (results || projects) && (
            <div className="h-max ml-12 w-96 searchcont rounded-full flex items-center px-4 py-3">
              <Image
                className="mr-2"
                width={24}
                height={24}
                src={"/assets/svgs/search_white.svg"}
                alt="search icon"
              />
              {/* UNIVERSAL SEARCH BAR */}
              <input
                onChange={(e) => {
                  if(homepageProjects || projects){
                    UpdateList(e.target.value)
                  }
                  setSearchVal(e.target.value);
                }}
                className="bg-transparent dashboardsearch flex-grow tbase text-white"
                type="text"
                placeholder="Search..."
                value={searchval}
              />
            </div>
          )
        }
      </div>

      {/* LOWER SECTION */}
      <div className="w-full flex mt-2 h-[90%] flex-grow rounded-2xl">
        {/* FROM /DASHBOARD/HOME */}
        {homepageProjects && (
          <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl bg-white">
            {
              resultsshow && 
              <div className="w-full h-full">
                <div className="w-full flex flex-row items-center py-6 px-2 justify-between">
                  <p className="tbasebold black">Test Title </p>
                  <div className="flex flex-row justify-between">
                    <p className="tbasebold w-28 flex items-center text-center mx-4 black">Test Type</p>
                    <span className="w-[1px] bg-gray-400"></span>
                    <p className="tbasebold w-28 flex items-center text-center mx-4 black">Project Name</p>
                    <span className="w-[1px] bg-gray-400"></span>
                    <p className="tbasebold w-28 flex items-center text-center mx-4 black">Date Created</p>
                    <span className="w-[1px] bg-gray-400"></span>
                    <p className="tbasebold w-28 flex items-center text-center mx-4 black">Time Created</p>
                  </div>
                </div>
                <div className="w-full flex-col">
                  {
                    homepageProjects.map((project)=>{
                      return (
                        project.results.map((result) => {
                          return <ResultInfo key={uuidv4()} result={result} projectid={project._id} resultid={result.id}/>;
                        })
                      )
                    })
                  }
                </div>
              </div>
            }
            {
              !resultsshow && 
              <div className="w-full h-full flex justify-center items-center">
                YOU HAVE NO RESULTS CREATED YET
              </div>
            }
          </div>
        )}

      {/* FROM /DASHBOARD/MYPROJECTS */}
        {projects && (
          <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl bg-white">
          {projects.length > 0 &&
            <div className="w-full h-full">
              <div className="w-full flex flex-row items-center py-6 px-2 justify-between">
                <p className="tbasebold black">Project Title </p>
                <div className="flex flex-row justify-between">
                  <p className="tbasebold w-28 flex items-center text-center mx-2 black">Date Created</p>
                  <span className="w-[1px] bg-gray-400"></span>
                  <p className="tbasebold w-28 flex items-center text-center mx-2 black">Time Created</p>
                </div>
              </div>
              <div className="w-full flex-col">
                {projects &&
                  projects.map((project) => {
                    return <ProjectInfo key={uuidv4()} project={project}/>;
                  })}
              </div>
            </div>
          }
          {
            projects.length === 0 &&
            <div className="w-full h-full flex justify-center items-center">
              YOU HAVE NO PROJECTS CREATED YET
            </div>
          }
          </div>
        )}

      {/* FROM /DASHBOARD/MYPROJECTS/PROJECTID */}
        {projectPageInfo && (
          <div className="w-full max-h-full flex flex-row flex-grow rounded-2xl">
            <div className="w-[50%] p-4 max-h-full rounded-2xl flex flex-col bg-white">
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Project Title :</h2>  
                <p className="my-2 rounded-2xl p-3 bg-gray-200">{projectPageInfo.title}</p>
              </div>
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Project Description :</h2>  
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">{projectPageInfo.desc}</p>
              </div>
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Date of creation :</h2>  
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">{projectPageInfo.date}</p>
              </div>
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Time created :</h2>  
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">{projectPageInfo.time}</p>
              </div>
              {/* EDIT AND DELETE PROJECT BUTTON */}
              <div className="my-5 w-full flex-grow flex flex-col justify-between items-center">
                  <button className="my-2" onClick={()=>{
                    router.push(`/edit-project/${session?.user._id || session?.user.id}/${projectPageInfo._id}`)
                  }}><Image src={"/assets/svgs/edit.svg"} width={24} height={24} alt="edit button"/></button>
                  <CanDelBtn text={"DELETE PROJECT"} addclass={"mx-auto my-2"} action={()=>{
                    setWarningHead(`Delete Project`)
                    setWarning(`Are you sure you want to delete this project?`)
                    ShowModal()
                  }}/>
              </div>
            </div>
            <div className="ml-4 flex-grow max-h-full">
              {projectPageInfo.results.length > 0 &&
                <div className="pr-4 w-full h-full overflow-y-scroll">
                  {
                    projectPageInfo.results.map((result)=>{
                      return (
                        <Link key={uuidv4()} href={`/dashboard/myprojects/${projectPageInfo._id}/${result.id}`} className="flex flex-col py-6 px-8 mb-3 bg-white h-max rounded-2xl w-full hover:scale-95 transition-all"> 
                        
                          {
                            (result.chosenchart == 'Bar Chart') ? 
                            <BarChart title = {result.title} subtitle = {result.subtitle} labels={result.labels} comps={result.comps} table={result.table} size={{height : 50 , width : 100}}/>
                            : 
                            <LineChart title = {result.title} subtitle = {result.subtitle} labels={result.labels} comps={result.comps} table={result.table} size={{height : 50 , width : 100}}/>
                          }
                        <div className="w-full">
                          <h2 className="tbasebold">{result.title}</h2>
                          <h2 className="tbasebold dorange">{result.chosentest + ' test result'}</h2>
                        </div>
                        </Link>
                      )
                    })
                  }
                </div>
              }
              { projectPageInfo.results.length === 0 &&
                <div className="h-full w-full flex items-center justify-center bg-white rounded-2xl">
                  <h1 >results under this project will show here</h1>
                </div>
              }
            </div>
          </div>
        )}

      {/* FROM /DASHBOARD/MYPROJECTS/PROJECTID/RESULTID */}
        {projectinfo && resultinfo && (
          <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl bg-white">
            <div className="flex flex-row">
              <div className="w-[50%] p-4 max-h-full rounded-2xl flex flex-col bg-white">
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Title of result :</h2>  
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">{resultinfo.title}</p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Test Type :</h2>  
                    <p className="my-2 rounded-2xl p-3 bg-gray-200">{resultinfo.chosentest}</p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Conclusion of result :</h2>  
                    <p className="my-2 rounded-2xl p-3 bg-gray-200">{resultinfo.conclusion}</p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Date of creation :</h2>  
                    <p className="my-2 rounded-2xl p-3 bg-gray-200">{resultinfo.date}</p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Time created :</h2>  
                    <p className="my-2 rounded-2xl p-3 bg-gray-200">{resultinfo.time}</p>
                </div>
              </div>
              {/* CHARTS AND DOWNLOAD BUTTON */}
              {resultinfo ?
                <div className="flex-grow h-full">
                  {/* THE CHARTs */}
                  {
                    (resultinfo.chosenchart == 'Bar Chart') ? 
                    <BarChart title = {resultinfo.title} subtitle = {resultinfo.subtitle} labels={resultinfo.labels} comps={resultinfo.comps} table={resultinfo.table} size={{height : 50 , width : 100}}/>
                    : 
                    <LineChart title = {resultinfo.title} subtitle = {resultinfo.subtitle} labels={resultinfo.labels} comps={resultinfo.comps} table={resultinfo.table} size={{height : 50 , width : 100}}/>
                  }
                </div>
                :
                <div>NO RESULT TO DISPLAY</div>
              }
            </div>
            {/* EDIT BUTTON */}
            <div className="mx-auto flex">
                <FillBLueBtn href={`/edit-result/${session?.user._id || session?.user.id}/${projectinfo._id}/${resultinfo.id}`} text={"EDIT RESULT"} addclass={"mx-4"}/>
                <CanDelBtn action={()=>{
                  setWarningHead(`Delete Result`)
                  setWarning(`Are you sure you want to delete this result?`)
                  ShowModal()
                }} text={"DELETE RESULT"} addclass={"mx-4"}/>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {
          settings && 
          (
            settings
          )
        }
      </div>
    </div>
  );
};

export default RightPane;
