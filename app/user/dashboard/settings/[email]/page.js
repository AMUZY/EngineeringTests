"use client";
import React, { useState, useReducer, useEffect } from "react";
import RightPane from "@components/RightPane";
import { container, labelclass, inputclass } from "@app/user/signup/page";
import Image from "next/image";
import { SaveBtn } from "@components/Button";
import { useSession } from "next-auth/react";
import Switch from "@mui/material/Switch";
import { promisetoast } from "@toasts/Toasts";
import axios from "axios";

let password = "";
let confirmpassword = "";

const UPDATEINFO = {
  PASSWORD: "password",
  CONFIRMPASSWORD: "confirmpassword",
};

function reducer(state, action) {
  switch (action.type) {
    case UPDATEINFO.PASSWORD: {
      return { ...state, password: action.payload };
    }
    case UPDATEINFO.CONFIRMPASSWORD: {
      return { ...state, confirmpassword: action.payload };
    }
  }
}

const hide = (state, newstate) => {
  if (state == "password") {
    newstate("text");
  } else {
    newstate("password");
  }
};

const settings = ({ params }) => {
  const [lightcheck, setLightCheck] = useState(false);
  const [darkcheck, setDarkCheck] = useState(false);
  const [system, setSystem] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { data: session } = useSession();
  const [user, dispatch] = useReducer(reducer, {
    password,
    confirmpassword,
  });
  const [localstore, setLocalStore] = useState();
  const [color, setColor] = useState("#ffff");
  const [active, setActive] = useState(false);
  const [iseyeopen, setIsEyeOpen] = useState(false);
  const [iseye2open, setIsEye2Open] = useState(false);
  const [ptype, setPType] = useState("password");
  const [ptype2, setPType2] = useState("password");

  useEffect(() => {
    setColor(localStorage.getItem("backgroundColor"));
    setLocalStore(localStorage);
  }, []);

  useEffect(() => {
    localstore &&
      localstore.getItem("app_theme") === "system" &&
      setSystem(true);
    localstore &&
      localstore.getItem("app_theme") === "light" &&
      setLightCheck(true);
    localstore &&
      localstore.getItem("app_theme") === "dark" &&
      setDarkCheck(true);
  }, [localstore]);

  // BG COLOR CHANGER
  const ChangeUiColor = (color) => {
    setColor(color);
    // STORE IN LOCAL STORAGE
    localStorage.setItem("backgroundColor", color);
    const elements = document.querySelectorAll(".colbox");
    elements.forEach((element) => {
      element.style.backgroundColor = color;
    });
  };

  const UpdatePassword = () => {
    if (user.password === user.confirmpassword) {
      setUpdating(true);
      const AwaitChange = new Promise(async (res, rej) => {
        await axios
          .put(`/api/user-http/${params.email}/password`, {
            password: user.confirmpassword,
          })
          .then(() => {
            setUpdating(false);
            res();
          })
          .catch(() => {
            setUpdating(false);
            rej();
          });
      });

      promisetoast(
        AwaitChange,
        "Updating password...",
        "Your password is successfully updated",
        "Failed to update password"
      );
    }
  };

  const DarkModeOn = () => {
    localStorage.setItem("app_theme", "dark");
    const dashboard = document.getElementById("dashboard");
    dashboard.classList.remove("dark_container");
    if (!dashboard.classList.toString().includes("dark_mode")) {
      dashboard.classList.add("dark_mode");
    }
  };
  const DarkModeOff = () => {
    localStorage.setItem("app_theme", "light");
    const dashboard = document.getElementById("dashboard");
    dashboard.classList.remove("dark_container");
    if (dashboard.classList.toString().includes("dark_mode")) {
      dashboard.classList.remove("dark_mode");
    }
  };

  const handleThemeChange = (theme) => {
    if (theme === "light") {
      setSystem(false);
      if (lightcheck === false) {
        // SET LIGHT THEME TRUE
        setLightCheck(true);
        DarkModeOff();
      } else {
        DarkModeOn();
        setLightCheck(false);
        setDarkCheck(true);
      }
      if (darkcheck === true) {
        setDarkCheck(false);
      }
    } else if (theme === "dark") {
      setSystem(false);
      if (lightcheck === true) {
        setLightCheck(false);
      }
      if (darkcheck === false) {
        // SET DARK THEME ON
        setDarkCheck(true);
        DarkModeOn();
      } else {
        DarkModeOff();
        setLightCheck(true);
        setDarkCheck(false);
      }
    } else {
      const dashboard = document.getElementById("dashboard");
      dashboard.classList.remove("dark_mode");
      if (system === false) {
        setLightCheck(false);
        setDarkCheck(false);
        setSystem(true);
        localStorage.setItem("app_theme", "system");
        if (!dashboard.classList.toString().includes("dark_container")) {
          dashboard.classList.add("dark_container");
        }
      } else if (system === true) {
        localStorage.setItem("app_theme", "light");
        setLightCheck(true);
        setSystem(false);
        if (dashboard.classList.toString().includes("dark_container")) {
          dashboard.classList.remove("dark_container");
        }
      }
    }
  };

  const settingsDiv = (
    <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl ">
      {/* SET DASHBOARD THEME */}
      <div className="flex flex-col my-2">
        <h2 className="tbasebold t_col my-3"> Dashboard theme :</h2>
        <div className="mx-auto rounded-2xl px-6 py-3 my-3 bg-gray-300 flex">
          <div className="flex items-center">
            <h2 className="mx-3 tbase">Default :</h2>
            <div
              style={{ width: 40, height: 40 }}
              className="cursor-pointer bckblue rounded-full"
              onClick={() => ChangeUiColor("rgba(36,52,112,0.8)")}
            ></div>
          </div>
          <div className="flex items-center">
            <h2 className="mx-3 tbase">Custom : </h2>
            <input
              type="color"
              className="style2"
              value={color}
              onChange={(e) => ChangeUiColor(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* SET APP THEME */}
      <div className="flex flex-col my-2">
        <h2 className="tbasebold t_col my-3"> Set App theme :</h2>
        <div className="mx-auto rounded-2xl px-6 py-3 my-3 bg-gray-300 flex">
          <div className="flex flex-wrap p-3 justify-center items-center">
            {/* LIGHT */}
            <div className="flex flex-wrap items-center mx-2">
              <h2 className="mx-3 tbase">Light :</h2>
              <Switch
                checked={lightcheck}
                onChange={() => handleThemeChange("light")}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            {/* DARK */}
            <div className="flex flex-wrap items-center mx-2">
              <h2 className="mx-3 tbase">Dark :</h2>
              <Switch
                checked={darkcheck}
                onChange={() => handleThemeChange("dark")}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            {/* USE SYSTEM SETTINGS */}
            <div className="flex flex-wrap items-center mx-2">
              <h2 className="mx-3 tbase">Use System theme :</h2>
              <Switch
                checked={system}
                onChange={() => handleThemeChange("system")}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* CHANGE PASSWORD */}
      {session?.user?.password && (
        <div className="flex flex-col my-2">
          <h2 className="tbasebold t_col my-3"> Change Password :</h2>
          <div
            style={{
              backgroundColor: localstore
                ? localstore.getItem("backgroundColor")
                : "currentcolor",
            }}
            className="mx-auto rounded-3xl px-6 py-3 my-3 bluegradient flex flex-col"
          >
            <div className={container}>
              <label className={labelclass} htmlFor="password">
                {" "}
                New Password :{" "}
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
                Confirm New Password :
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
            <div className="w-full">
              <SaveBtn
                disabled={updating}
                addclass={"mx-auto my-3"}
                text={"Update"}
                action={() => {
                  UpdatePassword();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return session && <RightPane pagename="Settings" settings={settingsDiv} />;
};

export default settings;
