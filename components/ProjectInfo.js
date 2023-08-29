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
      className="cursor-pointer w-full resultinfo flex flex-row items-center py-2 xl:py-6 px-2 justify-between hover:bg-gray-100"
    >
      <p className="block  mr-4 xl:mr-0 flex-shrink tbase black overflow-ellipsis">
        {project.title}
      </p>
      <div className="flex flex-row items-center justify-between w-80 sm:w-[200px] md:w-[250px] xl:w-[350px]">
        <p className="text-left xl:w-28 tbase mx-4 black">{project.date}</p>
        <p className="text-left xl:w-28 tbase mx-4 black">{project.time}</p>
      </div>
    </div>
  );
};

export default ProjectInfo;
