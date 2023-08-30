"use client";
import React, { useState, useReducer, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successtoast, failuretoast, promisetoast } from "@toasts/Toasts";
import BarChart from "@components/BarChart";
import LineChart from "@components/LineChart";
import { testTypes, chartTypes } from "@components/TestTypes";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { NoDuplicate } from "@components/NoDuplicate";
import Image from "next/image";
import { inputcont, inputstyle, labelstyle } from "@components/TestTypes";
import { SaveBtn, NormalBtn, CanDelBtn } from "@components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter();
  const getDate = new Date();
  const [loading, setLoading] = useState(false);
  // ALL INFORMATION FROM USER
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const handleCreate = async (title, desc, date, time) => {
    setLoading(true);

    const AwaitProjectCreate = async () => {
      await axios
        .post(`/api/project/create/${params._id}`, {
          title,
          desc,
          date,
          time,
        })
        .then(() => {
          setTimeout(() => {
            router.push("/user/dashboard/myprojects");
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoading(false);
        });
    };

    promisetoast(
      AwaitProjectCreate(),
      "Creating Project...",
      "Project created successfully",
      "Couldn't create project"
    );
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function SaveDateAndTime() {
    setDate(
      `${getDate.getDate()}-${getDate.getMonth() + 1}-${getDate.getFullYear()}`
    );
    setTime(formatAMPM(getDate));
  }

  useEffect(() => {
    if (title.length > 0 && desc.length > 0) {
      handleCreate(title, desc, date, time);
    }
  }, [date, time]);

  return (
    <div className="w-full h-full p-2 lg:p-6">
      <ToastContainer />
      <div className="flex-grow h-full dashbox overflow-y-scroll rounded-3xl p-3 flex flex-col justify-between">
        <div className="flex flex-col h-full w-full lg:p-6 ">
          <div className="flex mb-4 items-center">
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
            <p className="tsubtitle black"> Create New Project </p>
          </div>
          {/* INPUTS */}
          <div className="w-full h-full flex flex-col">
            <div className={inputcont + " w-full "}>
              <label className={labelstyle} htmlFor="project">
                {" "}
                Project Title :{" "}
              </label>
              <input
                required
                type="text"
                style={{ height: "max-content" }}
                className={inputstyle + " my-3 w-full md:w-3/4 xl:w-1/2 "}
                id="project"
                placeholder="e.g My new project title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>
            <div className={inputcont + " w-full h-full"}>
              <label className={labelstyle} htmlFor="desc">
                {" "}
                Project Description :
              </label>
              <textarea
                required
                type="text"
                className={
                  inputstyle + " my-3 w-full h-full md:w-3/4 xl:w-1/2 "
                }
                id="desc"
                placeholder="e.g This describes this new project"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
              />
            </div>
          </div>
        </div>
        <div className="flex mx-auto mt-4 mb-16">
          <SaveBtn
            text="Save Project"
            action={() => {
              if (title.length > 0 && desc.length > 0) {
                SaveDateAndTime();
              } else {
                failuretoast("Fill all fields first");
              }
            }}
            disabled={loading}
            addclass={`mx-2 ${
              loading
                ? "border-gray-500 bg-gray-500 text-gray-400 hover:bg-gray-500 hover:text-gray-400 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          />
          <CanDelBtn
            text="Cancel"
            action={() => window.history.back()}
            addclass="mx-2"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
