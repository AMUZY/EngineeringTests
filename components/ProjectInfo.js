"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ProjectInfo = ({ project }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/user/dashboard/myprojects/${project._id}`);
      }}
      className="cursor-pointer w-full resultinfo flex flex-row items-center py-4 xl:py-6 px-2 justify-between hover:bg-gray-100 dark:hover:bg-gray-400"
    >
      <p className="block mr-4 xl:mr-0 flex-shrink tbase t_col w-[50%] sm:w-auto overflow-ellipsis">
        {project.title}
      </p>
      <div className="flex flex-row items-center justify-end lg:justify-between w-[40%] sm:w-[180px] md:w-[250px] xl:w-[350px]">
        <p className="text-left xl:w-28 tbase t_col mx-4 ">{project.date}</p>
        <p className="hidden lg:block text-left xl:w-28 tbase t_col mx-4 ">
          {project.time}
        </p>
      </div>
    </div>
  );
};

export default ProjectInfo;
