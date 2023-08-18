"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { FillBLueBtn, FillBtn } from "./Button";
import { signOut,useSession } from "next-auth/react";

const ProfileNav = () => {
  const {data : session , status} = useSession()

  const router = useRouter();
  const [profilebtn, setProfilebtn] = useState(false);
  const path = usePathname();
  const nav = [
    {
      name: "Home",
      path: "/home",
      white: "/assets/svgs/home_white.svg",
      black: "/assets/svgs/home_black.svg",
    },
    {
      name: "My Projects",
      path: "/myprojects",
      white: "/assets/svgs/file_white.svg",
      black: "/assets/svgs/file_black.svg",
    },
    {
      name: "Settings",
      path: "/settings",
      white: "/assets/svgs/settings_white.svg",
      black: "/assets/svgs/settings_black.svg",
    },
  ];


  const navbtn = (item) => {
    return (
      <Link
        key={uuidv4()}
        className={`${
          path.includes(`/dashboard${item.path}`)
            ? "flex white my-1 tbase transition-all rounded-3xl p-3 bckblue"
            : "flex black my-1 hover:scale-110 transition-all tbase rounded-3xl p-3 ml-3"
        }`}
        href={`/dashboard${item.path}`}
      >
        <Image
          className="mr-2"
          width={24}
          height={24}
          src={
            path.includes(`/dashboard${item.path}`) ? item.white : item.black
          }
          alt={`navigation button "${item.name}"`}
        />
        {item.name}
      </Link>
    );
  };
  return (
    (session && 
      <div className="flex h-full flex-col justify-between my-3 mx-3">
        <div className="w-full h-max">
          <div className="mb-3">
            <div className="mb-3 w-full flex flex-row items-center justify-between">
              <Image
                className="rounded-full"
                width={55}
                height={55}
                src={
                  session.user.image
                    ? session?.user.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRBp1ijNZtMdCAaEMx75aFpJcEpJzwZoVl4seDNi8YA&s"
                }
                alt="profile image"
              />
              <span
                className="cursor-pointer relative"
                onClick={() => {
                  profilebtn ? setProfilebtn(false) : setProfilebtn(true);
                }}
              >
                <Image
                  width={64}
                  height={23}
                  src="/assets/svgs/threedots.svg"
                  alt="profile display button"
                />
                <div
                  className={`absolute top-8 right-0 w-52 h-max shadow-xl bg-white flex-col rounded-lg ${
                    profilebtn ? "flex" : "hidden"
                  }`}
                >
                  <span
                    onClick={() => {
                      router.push("/myprofile");
                      setProfilebtn(false);
                    }}
                    className={`tbase cursor-pointer black w-full p-3 h-max bg-white flex rounded-lg`}
                  >
                    <Image
                      className="mr-2"
                      width={24}
                      height={24}
                      src="/assets/svgs/profile.svg"
                      alt="profile button"
                    />
                    My Profile
                  </span>
                  {/* <input type="file"/> */}
                  <button
                    className="tbasebold dorange text-center p-3"
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    {" "}
                    Sign Out{" "}
                  </button>
                </div>
              </span>
            </div>
            <h1 className="tsubtitle black">{session?.user.username || session?.user.name}</h1>
          </div>
          <div className="flex flex-col my-8">
            {nav.map((item) => {
              return navbtn(item);
            })}
          </div>
          <p className="tbase"> Opened results will show below </p>
        </div>
        <div className="flex flex-col w-full h-max">
          <FillBLueBtn
            href={`/api/project/create/${session.user._id}`}
            text={"+ Project"}
            addclass={"mb-5 w-full text-center h-max"}
          />
          <FillBtn
            href={"/create-result"}
            text={"+ Result"}
            addclass={"mb-10 w-full text-center h-max"}
          />
        </div>
      </div>
      )
  );
};

export default ProfileNav;
