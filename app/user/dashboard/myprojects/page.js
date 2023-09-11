"use client";
import React from "react";
import RightPane from "@components/RightPane";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { promisetoast } from "@toasts/Toasts";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const myprofile = () => {
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
            console.log(error);
            rej();
          });
      }).then((data)=>{return data});

      promisetoast(
        fetchProjects,
        "Fetching projects...",
        "Projects fetched",
        "Failed to fetch projects, please refresh or check your internet"
      );
      return fetchProjects;
    }
  };

  const {
    data: allprojects,
  } = useSWR(
    `/api/project/other-http/${
      session?.user._id || session?.user.id
    }/undefined`,
    fetcher
  );

  return (
    <>
      <RightPane pagename="My Projects" projects={allprojects} />
    </>
  );
};

export default myprofile;
