"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import {v4 as uuidv4} from 'uuid'
import { useRouter } from "next/router";
import ResultInfo from "./ResultInfo";
import ProjectInfo from "./ProjectInfo";

const RightPane = ({ pagename, results ,projects, resultid, projectid }) => {
  const [searchval, setSearchVal] = useState("");
  return (
    <div className="w-full h-full flex flex-col p-1">
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
              projectid && (
                <p className="tbase black mx-1 text-gray-500 overflow-ellipsis">{` > ${"First Project"}`}</p>
              )
            }
            {
              resultid && (
                <>
                  <p className="tbase black mx-1 text-gray-500 overflow-ellipsis">{` > ${"First Project"} >`}</p>
                  <p className="tbase mx-1 text-gray-500 overflow-ellipsis">{`${"result"}`}</p>
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
              <input
                onChange={(e) => {
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
      <div className="w-full flex mt-2 py-2 px-4 flex-grow rounded-2xl bg-white">
        {results && (
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row items-center py-6 justify-between">
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
              {results &&
                results.map((result) => {
                  return <ResultInfo key={uuidv4()} result={result}/>;
                })}
            </div>
          </div>
        )}

        {projects && (
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row items-center py-6 justify-between">
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
        )}

        {projectid && (
          <div className="w-full flex flex-col">

          </div>
        )}

        {resultid && (
          <div className="w-full flex flex-col">
            
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPane;
