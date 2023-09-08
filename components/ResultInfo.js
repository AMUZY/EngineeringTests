"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const ResultInfo = ({ result, projectid, resultid }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/user/dashboard/myprojects/${projectid}/${resultid}`);
      }}
      className="cursor-pointer w-full resultinfo flex flex-row items-center py-4 xl:py-6 px-2 justify-between hover:bg-gray-100 dark:hover:bg-gray-400"
    >
      <p className="block flex-shrink tbase t_col  overflow-hidden whitespace-nowrap overflow-ellipsis">
        {result.title}
      </p>
      <div className="flex flex-row sm:w-[500px] md:w-[550px] xl:w-[700px] items-center justify-between">
        <p className="text-left mx-2 md:mx-4 xl:w-28 tbase t_colbold dorange">
          {result.chosentest}
        </p>
        <p className="hidden lg:block text-left mx-2 md:mx-4 xl:w-28 tbase t_col  overflow-hidden whitespace-nowrap overflow-ellipsis">
          {result.chosenproject}
        </p>
        <p className="hidden lg:block text-left mx-2 md:mx-4 xl:w-28 tbase t_col ">
          {result.date}
        </p>
        <p className="hidden lg:block text-left mx-2 md:mx-4 xl:w-28 tbase t_col ">
          {result.time}
        </p>
      </div>
    </div>
  );
};

export default ResultInfo;
