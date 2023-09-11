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
          .get(
            `/api/project/get-result/${session?.user._id || session?.user.id}/${
              params.projectid
            }/${params.resultid}`
          )
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
        "Fetching result",
        "Result fetched",
        "Failed to fetch result, please refresh or check your internet"
      );
      return fetchProjects;
    }
  };

  const {
    data: data,
  } = useSWR(
    `/api/project/get-result/${session?.user._id || session?.user.id}/${
      params.projectid
    }/${params.resultid}`,
    fetcher
  );

  return (
    <>
      <RightPane
        pagename="My Projects"
        projectinfo={data && data.project}
        resultinfo={data && data.result}
      />
    </>
  );
};

export default page;
