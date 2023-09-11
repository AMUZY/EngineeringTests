"use client";
import React from "react";
import RightPane from "@components/RightPane";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { promisetoast } from "@toasts/Toasts";
import useSWR from "swr";

const page = ({ params }) => {
  const { data: session } = useSession();

  const fetcher = (url) => {
    if(session?.user._id || session?.user.id){
      const fetchProjects = new Promise(async (res, rej) => {
        await axios
          .get(url)
          .then((response) => {
            const data = response.data;
            res(data);
          })
          .catch((error) => {
            rej();
          });
      }).then((data)=>{return data});

      promisetoast(
        fetchProjects,
        "Getting project info",
        "Project info fetched",
        "Failed to fetch project info, please refresh or check your internet"
      );
      return fetchProjects;
    }
  };

  const {
    data: project,
  } = useSWR(
    `/api/project/other-http/${session?.user._id || session?.user.id}/${
      params.projectid
    }`,
    fetcher
  );

  return (
    <>
      <RightPane pagename="My Projects" projectPageInfo={project} />
    </>
  );
};

export default page;
