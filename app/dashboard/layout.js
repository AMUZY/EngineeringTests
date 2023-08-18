'use client'
import React from "react";
import ProfileNav from "@components/ProfileNav";
import { SessionProvider } from "next-auth/react";

const layout = ({ children }) => {
  return (
    <SessionProvider >
      <div className="w-full h-full p-6">
        <div className="w-full boxcontainer h-full flex flex-row rounded-3xl overflow-visible">
          <div className="mr-3 w-[20%] h-full dashbox rounded-3xl p-3">
            <ProfileNav />
          </div>
          <div className="ml-3 flex-grow h-full dashbox rounded-3xl p-3">
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default layout;
