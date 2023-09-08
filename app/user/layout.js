"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

const layout = ({ children }) => {
  const [localstore, setLocalStore] = useState();
  useEffect(() => {
    setLocalStore(localStorage);
  }, []);

  const getTheme = () => {
    if (localstore.getItem("app_theme") === "light") {
      return " ";
    } else if (localstore.getItem("app_theme") === "dark") {
      return "dark_mode";
    } else {
      return "dark_container";
    }
  };

  return (
    localstore && (
      <div id="dashboard" className={`${getTheme()} w-full h-full`}>
        <SessionProvider>{children}</SessionProvider>
      </div>
    )
  );
};

export default layout;
