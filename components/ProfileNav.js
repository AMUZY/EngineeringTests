"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SVGS } from "@components/SVGs";
import { v4 as uuidv4 } from "uuid";
import { FillBLueBtn, FillBtn } from "./Button";
import { signOut, useSession } from "next-auth/react";

const ProfileNav = () => {
  const { data: session, status } = useSession();
  const [localstore, setLocalStore] = useState();
  useEffect(() => {
    setLocalStore(localStorage);
  }, []);

  const router = useRouter();
  const [profilebtn, setProfilebtn] = useState(false);
  const path = usePathname();
  const nav = [
    {
      name: "Home",
      path: "/home",
      white: SVGS.home_white,
      black: SVGS.home_black,
    },
    {
      name: "My Projects",
      path: "/myprojects",
      white: SVGS.file_white,
      black: SVGS.file_black,
    },
    {
      name: "Settings",
      path: `/settings/${session?.user.email}`,
      white: SVGS.settings_white,
      black: SVGS.settings_black,
    },
  ];

  const navbtn = (item) => {
    return (
      <Link
        style={{
          backgroundColor:
            localstore && path.includes(`/user/dashboard${item.path}`)
              ? localstore.getItem("backgroundColor")
              : "transparent",
        }}
        key={uuidv4()}
        className={`${
          path.includes(`/user/dashboard${item.path}`)
            ? "flex justify-center md:w-full lg:justify-start white my-1 tbase transition-all rounded-3xl p-3 bckblue colbox"
            : "flex justify-center md:w-full lg:justify-start black my-1 hover:scale-110 transition-all tbase rounded-3xl p-3 lg:ml-3"
        }`}
        href={`/user/dashboard${item.path}`}
      >
        {path.includes(`/user/dashboard${item.path}`) ? item.white : item.black}
        <h2
          className={`${
            path.includes(`/user/dashboard${item.path}`)
              ? "active_nav hidden lg:inline-block"
              : "unactive_nav hidden lg:inline-block"
          }`}
        >
          {item.name}
        </h2>
      </Link>
    );
  };

  const showBlurBox = () => {
    const blurbox = document.getElementById("blurbox");
    blurbox.classList.toggle("hidden");
  };

  return (
    session && (
      <div
        onClick={() => {
          profilebtn ? setProfilebtn(false) : null;
        }}
        onMouseLeave={() => {
          setProfilebtn(false);
        }}
        className="flex h-auto flex-row md:flex-col md:h-full justify-between my-3 mx-3"
      >
        <div className="flex flex-row items-center md:flex-col md:items-start justify-between w-full h-max">
          <div className="md:mb-3 w-full">
            <div className="mb-0 md:mb-3 w-auto flex flex-row justify-between items-center md:flex-col md:justify-start md:w-full lg:flex-row lg:justify-between">
              {/* MOBILE CLICKABLE PROFILE PHOTO IN SPAN */}
              <span
                className="cursor-pointer lg:hidden"
                onClick={() => {
                  showBlurBox();
                  profilebtn ? setProfilebtn(false) : setProfilebtn(true);
                }}
              >
                <Image
                  className="rounded-full"
                  width={55}
                  height={55}
                  src={
                    session?.user.image
                      ? session?.user.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRBp1ijNZtMdCAaEMx75aFpJcEpJzwZoVl4seDNi8YA&s"
                  }
                  alt="profile image"
                />
                {/* POP UP MENU FOR MOBILE */}
                <div
                  id="popup"
                  className={`absolute z-10 w-max h-max shadow-xl bg-white flex-col rounded-lg ${
                    profilebtn ? "flex" : "hidden"
                  }`}
                >
                  <span
                    onClick={() => {
                      router.push(
                        `/user/myprofile/${
                          session?.user?._id || session?.user?.id
                        }`
                      );
                      setProfilebtn(false);
                    }}
                    className={`tbase cursor-pointer black w-full p-3 h-max bg-white flex justify-center rounded-lg`}
                  >
                    <Image
                      className="mr-2"
                      width={24}
                      height={24}
                      src="/assets/svgs/profile.svg"
                      alt="profile button"
                    />
                    <h2 className="hidden md:inline">My Profile</h2>
                  </span>
                  {/* CREATE PROJECT AND RESULT */}
                  <div className="flex block md:hidden flex-col mx-auto my-2 h-max">
                    <FillBLueBtn
                      href={`/user/create-project/${
                        session?.user._id || session?.user.id
                      }`}
                      text={"+ P"}
                      addclass={"my-1 text-center h-max"}
                    />
                    <FillBtn
                      href={`/user/create-result/${
                        session?.user._id || session?.user.id
                      }`}
                      text={"+ R"}
                      addclass={"my-1 text-center h-max"}
                    />
                  </div>
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
              {/* DESKTOP IMAGE (NON-CLICKABLE) */}
              <Image
                className="hidden lg:inline-block rounded-full"
                width={55}
                height={55}
                src={
                  session?.user.image
                    ? session?.user.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRBp1ijNZtMdCAaEMx75aFpJcEpJzwZoVl4seDNi8YA&s"
                }
                alt="profile image"
              />
              {/* MOBILE NAV */}
              <div className="flex items-center flex-row md:hidden">
                {nav.map((item) => {
                  return navbtn(item);
                })}
              </div>
              <span
                className="hidden lg:inline mt-0 md:mt-4 lg:mt-0 cursor-pointer relative"
                onClick={() => {
                  profilebtn ? setProfilebtn(false) : setProfilebtn(true);
                }}
              >
                {SVGS.threedots}
                {/* POP UP MENU FOR DESKTOP */}
                <div
                  className={`absolute top-8 -right-px lg:right-0 w-max lg:w-52 h-max shadow-xl bg-white flex-col rounded-lg ${
                    profilebtn ? "flex" : "hidden"
                  }`}
                >
                  <span
                    onClick={() => {
                      router.push(
                        `/user/myprofile/${
                          session?.user?._id || session?.user?.id
                        }`
                      );
                      setProfilebtn(false);
                    }}
                    className={`tbase cursor-pointer black w-full p-3 h-max bg-white flex justify-center rounded-lg`}
                  >
                    <Image
                      className="mr-2"
                      width={24}
                      height={24}
                      src="/assets/svgs/profile.svg"
                      alt="profile button"
                    />
                    <h2 className="hidden md:inline">My Profile</h2>
                  </span>
                  {/* CREATE PROJECT AND RESULT */}
                  <div className="flex block md:hidden flex-col mx-auto my-2 h-max">
                    <FillBLueBtn
                      href={`/user/create-project/${
                        session?.user._id || session?.user.id
                      }`}
                      text={"+ P"}
                      addclass={"my-1 text-center h-max"}
                    />
                    <FillBtn
                      href={`/user/create-result/${
                        session?.user._id || session?.user.id
                      }`}
                      text={"+ R"}
                      addclass={"my-1 text-center h-max"}
                    />
                  </div>
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
            <h1 className="tsubtitle t_col hidden md:inline-block text-center lg:text-left">
              {session?.user.username || session?.user.name}
            </h1>
          </div>
          {/* TABLET AND DESKTOP NAV */}
          <div className="flex hidden flex-row items-center my-auto md:block md:flex-col md:w-full md:my-8">
            {nav.map((item) => {
              return navbtn(item);
            })}
          </div>
          {/* <p className="tbase"> Opened results will show below </p> */}
        </div>

        <div className="flex hidden md:block flex-col w-full h-max">
          <FillBLueBtn
            href={`/user/create-project/${
              session?.user._id || session?.user.id
            }`}
            text={"+ Project"}
            addclass={"block mb-5 w-full text-center h-max"}
          />
          <FillBtn
            href={`/user/create-result/${
              session?.user._id || session?.user.id
            }`}
            text={"+ Result"}
            addclass={"block mb-10 w-full text-center h-max"}
          />
        </div>
      </div>
    )
  );
};

export default ProfileNav;
