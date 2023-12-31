"use client";
import React from "react";
import Loader from "@components/Loader";

const loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader main={true} />
    </div>
  );
};

export default loading;
