"use client";
import React, { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { signIn, getProviders } from "next-auth/react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { normaltoast, failuretoast, promisetoast } from "@toasts/Toasts";
import { useRouter } from "next/navigation";
import { loginUser } from "@helpers/helper";

let username = "";
let email = "";
let password = "";
let confirmpassword = "";

const UPDATEINFO = {
  USERNAME: "username",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRMPASSWORD: "confirmpassword",
};

function reducer(state, action) {
  switch (action.type) {
    case UPDATEINFO.USERNAME: {
      return { ...state, username: action.payload };
    }
    case UPDATEINFO.EMAIL: {
      return { ...state, email: action.payload };
    }
    case UPDATEINFO.PASSWORD: {
      return { ...state, password: action.payload };
    }
    case UPDATEINFO.CONFIRMPASSWORD: {
      return { ...state, confirmpassword: action.payload };
    }
  }
}

export const container =
  "relative flex flex-col md:flex-row items-start md:items-center justify-between my-2 lg:my-4";
export const labelclass =
  "nohighlight bg-transparent tbase text-white mb-2 mr-4 md:mb-0 lg:mr-12";
export const inputclass =
  "input bg-transparent w-full md:w-auto tbase text-white focus:outline-none flex-grow py-1 px-2 lg:py-3 lg:px-4 ";

const signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submiterror, setSubmitError] = useState();
  const [providers, setProviders] = useState(null);
  const [user, dispatch] = useReducer(reducer, {
    username,
    email,
    password,
    confirmpassword,
  });
  const [iseyeopen, setIsEyeOpen] = useState(false);
  const [iseye2open, setIsEye2Open] = useState(false);
  const [ptype, setPType] = useState("password");
  const [ptype2, setPType2] = useState("password");

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setAllProviders();
  }, []);


  const handleSubmit = async (username, email, pword, confpword) => {
    if (pword === confpword) {
      setLoading(true)

      const AwaitUserCreate = new Promise(async (res,rej) => {
        await axios
          .post(`/api/create-user`, {
            username: username,
            email: email,
            password: confpword,
          })
          .then(() => {
            normaltoast("Preparing your dashboard...");
            // Go to dashboard
            const loginRes = async () => {
              const login = await loginUser({
                email: email,
                password: confpword,
              });

              if (login && !login.ok) {
                setSubmitError(login.error || "");
              } else {
                router.push("/");
              }
            };
            loginRes();
            setLoading(false);
            res()
          }).catch((error)=>{
            setLoading(false);
            rej()
          });
      })

      promisetoast(
        AwaitUserCreate,
        "Account creation in progress",
        "Account created successfully",
        "Error, something went wrong"
      );
    } else {
      failuretoast(error.response.data);
    }

  };

  const hide = (state, newstate) => {
    if (state == "password") {
      newstate("text");
    } else {
      newstate("password");
    }
  };

  return (
    <section className="min-h-[100svh] section bluegradient flex flex-col">
      <ToastContainer />
      <div className="flex flex-row justify-start">
        <button
          className="p-2 w-max flex flex-row items-center hover:scale-125 transition-all"
          onClick={() => 
            router.push("/")
          }
        >
          <Image
            src="/assets/svgs/backarrow.svg"
            width={40}
            height={42}
            alt="engineeringtests logo transparent"
          />
          <h3 className="hidden tbase text-white lg:inline">Go back </h3>
        </button>
      </div>
      <div className="w-full flex flex-row">
        <div className="hidden lg:block w-1/2">
          <Image
            className="hover:scale-105 transition-all"
            src="/assets/images/ET_trans.png"
            width={622}
            height={722}
            alt="engineeringtests logo transparent"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="ttitle text-white text-center"> Create account </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                user.username,
                user.email,
                user.password,
                user.confirmpassword
              );
            }}
            className="my-3 flex flex-col"
          >
            <div className={container}>
              <label className={labelclass} htmlFor="username">
                {" "}
                Username :{" "}
              </label>
              <div className="relative pwordcont w-full md:flex-grow md:w-auto flex">
                <input
                  className={inputclass}
                  required
                  onChange={(e) => {
                    dispatch({
                      type: UPDATEINFO.USERNAME,
                      payload: e.target.value,
                    });
                  }}
                  type="text"
                  id="username"
                  placeholder="your username"
                  value={user.username}
                />
              </div>
            </div>
            <div className={container}>
              <label className={labelclass} htmlFor="email">
                {" "}
                Email :{" "}
              </label>
              <div className="relative pwordcont w-full md:flex-grow md:w-auto flex">
                <input
                  className={inputclass}
                  required
                  onChange={(e) => {
                    dispatch({
                      type: UPDATEINFO.EMAIL,
                      payload: e.target.value,
                    });
                  }}
                  type="text"
                  id="email"
                  placeholder="e.g ofordileyoungproff@yahoo.com"
                  value={user.email}
                />
              </div>
            </div>
            <div className={container}>
              <label className={labelclass} htmlFor="password">
                {" "}
                Password :{" "}
              </label>
              <div className="relative pwordcont w-full md:flex-grow md:w-auto flex">
                <input
                  className={inputclass}
                  required
                  onChange={(e) => {
                    dispatch({
                      type: UPDATEINFO.PASSWORD,
                      payload: e.target.value,
                    });
                  }}
                  type={ptype}
                  id="password"
                  placeholder="enter password"
                  value={user.password}
                />
                <Image
                  className="cursor-pointer"
                  onClick={() => {
                    hide(ptype, setPType);
                    user.password.trim().length >= 1 &&
                      setIsEyeOpen(!iseyeopen);
                  }}
                  src={
                    iseyeopen
                      ? "/assets/svgs/eyeopen.svg"
                      : "/assets/svgs/eyeclose.svg"
                  }
                  width={20}
                  height={20}
                  alt="eye icon"
                />
              </div>
            </div>
            <div className={container}>
              <label className={labelclass} htmlFor="confirmpassword">
                {" "}
                Confirm Password :
              </label>
              <div className="relative pwordcont w-full md:flex-grow md:w-auto flex">
                <input
                  className={inputclass}
                  required
                  onChange={(e) => {
                    dispatch({
                      type: UPDATEINFO.CONFIRMPASSWORD,
                      payload: e.target.value,
                    });
                  }}
                  type={ptype2}
                  id="confirmpassword"
                  placeholder="confirm password "
                  value={user.confirmpassword}
                />
                <Image
                  className="cursor-pointer"
                  onClick={() => {
                    hide(ptype2, setPType2);
                    user.confirmpassword.trim().length >= 1 &&
                      setIsEye2Open(!iseye2open);
                  }}
                  src={
                    iseye2open
                      ? "/assets/svgs/eyeopen.svg"
                      : "/assets/svgs/eyeclose.svg"
                  }
                  width={20}
                  height={20}
                  alt="eye icon"
                />
              </div>
            </div>
            {/* BUTTON TO CREATE ACCOUNT  */}
            <button
              disabled={loading}
              className={`my-3 mx-auto fill w-full md:w-max  ${
                loading
                  ? "border-gray-500 bg-gray-500 text-gray-400 hover:bg-gray-500 hover:text-gray-400 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Create account
            </button>
          </form>

          <h3 className="tbase text-white text-center"> or </h3>
          <div className="py-2 mt-1 w-full flex flex-col items-center">
            {/* GOOGLE SIGN IN BUTTON */}
            <button
              onClick={() => {
                signIn(providers.google.id, {
                  callbackUrl: `/user/dashboard/home`,
                });
              }}
              className="my-2 mx-auto"
            >
              <Image
                src="/assets/svgs/googlebtn.svg"
                width={345}
                height={54}
                alt="sign in with google"
              />
            </button>
            {/* LINKEDIN SIGN IN BUTTON */}
            <button
              onClick={() => {
                signIn(providers.linkedin.id, {
                  callbackUrl: `/user/dashboard/home`,
                });
              }}
              className="my-2 mx-auto"
            >
              <Image
                src="/assets/svgs/linkedinbtn.svg"
                width={345}
                height={54}
                alt="sign in with linkedin"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default signup;
