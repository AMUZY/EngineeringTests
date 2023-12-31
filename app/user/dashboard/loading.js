"use client";
import React from "react";
import Loader from "@components/Loader";

const loading = () => {
  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <Loader main={true} />
    </div>
  );
};

export default loading;
