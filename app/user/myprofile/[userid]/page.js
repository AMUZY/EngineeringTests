"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CanDelBtn } from "@components/Button";
import TwoBtnModal from "@components/TwoBtnModal";
import { promisetoast } from "@toasts/Toasts";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { SVGS } from "@components/SVGs";

const page = ({ params }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const warningheading = `DELETE ACCOUNT`;
  const warning = `Are you sure you want to delete your account? This will erase all projects and containing results`;
  const action = `Yes, I'm sure`;
  const [modal, setModal] = useState(false);

  const handleAccountDel = () => {
    const AwaitAccountDel = new Promise(async (res, rej) => {
      await axios
        .delete(`/api/delete-user/${params.userid}`)
        .then(() => {
          res();
          signOut({ callbackUrl: `/` });
        })
        .catch(() => {
          rej();
        });
    });

    promisetoast(
      AwaitAccountDel,
      "Deleting Account",
      "Account Deleted",
      "Couldn't delete account"
    );
  };

  const ShowModal = () => {
    setModal(true);
  };
  const CloseModal = () => {
    setModal(false);
  };

  console.log(searchParams.get("image"));

  return (
    <div className="white_bg w-full h-full p-6">
      <ToastContainer />
      {modal ? (
        <TwoBtnModal
          warningheading={warningheading}
          warning={warning}
          action={action}
          modal={modal}
          ShowModal={ShowModal}
          CloseModal={CloseModal}
          MainAction={handleAccountDel}
        />
      ) : null}
      <div className="flex-grow flex flex-col h-full dashbox rounded-3xl p-3">
        <div className="flex items-center">
          <button
            className="p-2 w-max flex flex-row items-center hover:scale-125 transition-all"
            onClick={() => {
              window.history.back();
            }}
          >
            {SVGS.backarrow_black}
          </button>
          <p className="ml-1 tsubtitle t_col"> My Profile </p>
        </div>
        <div className="w-full flex-grow flex flex-col justify-between items-center">
          <div className="flex flex-col items-center">
            <Image
              className="rounded-full"
              src={
                session?.user.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRBp1ijNZtMdCAaEMx75aFpJcEpJzwZoVl4seDNi8YA&s"
              }
              width={80}
              height={80}
              alt="profile"
            />
            <h1 className="ttitle t_col my-3">
              {session?.user.name || session?.user.username}
            </h1>
          </div>
          <CanDelBtn
            text={"DELETE MY ACCOUNT"}
            addclass={"mb-16 tbase"}
            action={() => {
              ShowModal();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
