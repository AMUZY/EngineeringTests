"use client";
import React, { useState } from "react";
import ProfileNav from "@components/ProfileNav";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function layout({ children }) {
  const [authstate, setAuthState] = useState(false);
  const router = useRouter();

  const [localstore, setLocalStore] = useState();
  useEffect(() => {
    setLocalStore(localStorage);
    function CheckAuth() {
      const session = getSession();
      session
        .then((status) => {
          if (!status) {
            router.push("/unauthenticated");
          } else {
            setAuthState(true);
          }
        })
        .catch(() => {});
    }
    CheckAuth();
  }, []);


  const showBlurBox = () => {
    const blurbox = document.getElementById("blurbox");
    blurbox.classList.toggle("hidden");
    const popup = document.getElementById("popup");
    popup.classList.toggle("hidden");
    popup.classList.toggle("flex");
  };

  return (
    authstate && localstore && (
      <div className="white_bg w-full h-full p-2 md:p-6">
        <div className="relative w-full boxcontainer h-full flex flex-col md:flex-row rounded-3xl overflow-visible">
          <div className="mr-3 w-full md:w-auto lg:w-[20%] dashbox rounded-3xl p-0 md:p-3">
            <ProfileNav />
          </div>
          {/* BLURBOX */}
          <div
            onClick={() => showBlurBox()}
            id="blurbox"
            className="absolute hidden z-[2] top-0 left-0 w-full h-full opacity-90 bg-black"
          ></div>
          <div
            style={{
              backgroundColor: localstore
                ? localstore.getItem("backgroundColor")
                : "rgba(36, 52, 112, 0.8)",
            }}
            className="colbox ml-0 mt-2 md:mt-0 md:ml-3 overflow-y-scroll flex-grow dashBackground dashbox rounded-3xl p-1 md:p-3"
          >
            <div className="min-h-full flex flex-col">{children}</div>
          </div>
        </div>
      </div>
    )
  );
}
