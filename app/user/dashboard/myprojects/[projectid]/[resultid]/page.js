"use client";
import React from "react";
import RightPane from "@components/RightPane";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { promisetoast } from "@toasts/Toasts";

const page = ({ params }) => {
  const [project, setProject] = useState();
  const [result, setResult] = useState();
  const { data: session } = useSession();
  const [sess, setSess] = useState();

  useEffect(() => {
    if ((session?.user._id && !sess) || (session?.user.id && !sess)) {
      const fetchProjects = new Promise(async (res, rej) => {
        await axios
          .get(
            `/api/project/get-result/${session?.user._id || session?.user.id}/${
              params.projectid
            }/${params.resultid}`
          )
          .then((response) => {
            const data = response.data;
            setProject(data.project);
            setResult(data.result);
            res();
          })
          .catch((error) => {
            rej();
          });
      });

      promisetoast(
        fetchProjects,
        "Fetching result",
        "Result fetched",
        "Failed to fetch result, please refresh or check your internet"
      );

      setSess(session);
    }
  }, []);

  return (
    <>
      <ToastContainer className="hidden lg:block" />
      <RightPane
        pagename="My Projects"
        projectinfo={project}
        resultinfo={result}
      />
    </>
  );
};

export default page;
