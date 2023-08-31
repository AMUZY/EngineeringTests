"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import ResultInfo from "./ResultInfo";
import ProjectInfo from "./ProjectInfo";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { CanDelBtn, FillBLueBtn, FillBtn } from "./Button";
import TwoBtnModal from "@components/TwoBtnModal";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { promisetoast } from "@toasts/Toasts";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RightPane = ({
  pagename,
  results,
  homepageProjects,
  projects,
  resultinfo,
  projectinfo,
  projectPageInfo,
  settings,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [sess, setSess] = useState(session);
  const [modal, setModal] = useState(false);
  const [resultsshow, setResultsShow] = useState(false);
  const [warningheading, setWarningHead] = useState("");
  const [warning, setWarning] = useState("");
  const action = `Yes, I'm sure`;

  // HTML LOADER
  const [pdfloader, setPdfLoader] = useState(false);
  const [imgloader, setImgLoader] = useState(false);

  const [searchval, setSearchVal] = useState("");

  // SEARCHED ITEMS TO USE FOR INDIVIDUAL PAGES
  const [searchedItems, setSearchedItems] = useState([]);
  // END

  // LOCAL STORAGE COLOR CHANGER
  const [localstore, setLocalStore] = useState();
  useEffect(() => {
    setLocalStore(localStorage);
  }, []);

  // BELOW USEFFECT TO setIncomingItems ACCORDING TO PAGE IN USE
  useEffect(() => {
    if (homepageProjects) {
      let temparray = [];
      for (let i = 0; i < homepageProjects.length; i++) {
        temparray.push(homepageProjects[i]);
      }
      setSearchedItems(temparray);
    } else if (projects) {
      let temparray = [];
      for (let i = 0; i < projects.length; i++) {
        temparray.push(projects[i]);
      }
      setSearchedItems(temparray);
    }
  }, [homepageProjects, projects]);
  //

  // FUNCTION THAT UPDATES THE LIST
  function UpdateList(searchword) {
    if (homepageProjects) {
      console.log(homepageProjects);
      const tempSearchedArray = homepageProjects.filter((inItem) => {
        for (let i = 0; i < homepageProjects.length; i++) {
          if (inItem.results[i]) {
            return inItem.results[i].title
              .toLowerCase()
              .includes(searchword.toLowerCase());
          }
        }
      });
      if (searchval.trim().length > 0) {
        setSearchedItems(tempSearchedArray);
      } else {
        setSearchedItems(homepageProjects);
      }
    }
    if (projects) {
      const tempSearchedArray = projects.filter((inItem) => {
        return inItem.title.toLowerCase().includes(searchword.toLowerCase());
      });
      if (searchval.trim().length > 0) {
        setSearchedItems(tempSearchedArray);
      } else {
        setSearchedItems(projects);
      }
    }
  }

  const ShowModal = () => {
    setModal(true);
  };
  const CloseModal = () => {
    setModal(false);
  };

  const DelResult = () => {
    const AwaitResultDelete = new Promise(async (res, rej) => {
      await axios
        .put(
          `/api/project/other-http/${session?.user._id || session?.user.id}/${
            projectinfo._id
          }`,
          {
            id: resultinfo.id,
            delete: true,
          }
        )
        .then(() => {
          res();
          router.push(`/user/dashboard/home`);
        })
        .catch(() => {
          rej();
        });
    });

    promisetoast(
      AwaitResultDelete,
      "Deleting result...",
      "Result deleted successfully",
      "Couldn't delete result"
    );
  };

  const DelProject = () => {
    const AwaitProjectDelete = new Promise(async (res, rej) => {
      await axios
        .delete(
          `/api/project/other-http/${session?.user._id || session?.user.id}/${
            projectPageInfo._id
          }`
        )
        .then(() => {
          res();
          router.push("/user/dashboard/home");
        })
        .catch(() => {
          rej();
        });
    });

    promisetoast(
      AwaitProjectDelete,
      "Deleting project...",
      "Project deleted successfully",
      "Couldn't delete project"
    );
  };

  useEffect(() => {
    if (homepageProjects) {
      for (let i = 0; i < homepageProjects.length; i++) {
        if (homepageProjects[i].results.length > 0) {
          setResultsShow(true);
        }
      }
    }
  }, [homepageProjects]);

  const downloadPDF = () => {
    const capture = document.querySelector(".capture");
    html2canvas(capture).then((canvas) => {
      setPdfLoader(false);
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("l", "em", "junior-legal");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 1, 1, componentWidth, componentHeight);
      doc.save(`${resultinfo.title}.pdf`);
    });
    setPdfLoader(true);
  };

  const downloadimage = () => {
    const capture = document.querySelector(".capture");
    html2canvas(capture).then(async (canvas) => {
      setImgLoader(false);
      const imageURL = canvas.toDataURL("img/png");
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = `${resultinfo.title}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    setImgLoader(true);
  };

  return (
    <div className="w-full flex-grow flex flex-col p-1">
      <ToastContainer />
      {modal ? (
        <TwoBtnModal
          warningheading={warningheading}
          warning={warning}
          action={action}
          modal={modal}
          ShowModal={ShowModal}
          CloseModal={CloseModal}
          MainAction={
            warningheading === "Delete Result" ? DelResult : DelProject
          }
        />
      ) : null}
      <div className="flex items-center justify-between h-16 md:h-[10%] mb-0 md:mb-2 rounded-2xl bg-white p-2">
        <div className="flex flex-row items-center">
          <button
            className="p-2 w-max flex flex-row items-center hover:scale-125 transition-all"
            onClick={() => {
              window.history.back();
            }}
          >
            <Image
              src="/assets/svgs/backarrow_black.svg"
              width={40}
              height={42}
              alt="engineeringtests logo transparent"
            />
          </button>
          {/* PAGE TITLE AND CHILDREN TITLES */}
          <div className="hidden md:flex items-center">
            {pagename && <a className="tsubtitle black">{pagename}</a>}
            {projectPageInfo && (
              <a
                href={`/user/dashboard/myprojects/${projectPageInfo._id}`}
                className="tbase black mx-1 text-gray-500 overflow-ellipsis"
              >{` > ${projectPageInfo.title}`}</a>
            )}
            {resultinfo && (
              <>
                <a
                  href={`/user/dashboard/myprojects/${projectinfo._id}`}
                  className="tbase black mx-1 text-gray-500 overflow-ellipsis"
                >{` > ${projectinfo.title} >`}</a>
                <a
                  href={`/user/dashboard/myprojects/${projectinfo._id}/${resultinfo.id}`}
                  className="tbase mx-1 text-gray-500 overflow-ellipsis"
                >{`${resultinfo.title}`}</a>
              </>
            )}
          </div>
        </div>
        {(homepageProjects || projects) && (
          <div
            style={{
              backgroundColor: localstore
                ? localstore.getItem("backgroundColor")
                : "currentcolor",
            }}
            className="h-max ml-3 md:ml-12 w-full md:w-96 searchcont rounded-full colbox flex items-center px-4 py-3"
          >
            <Image
              className="mr-2"
              width={24}
              height={24}
              src={"/assets/svgs/search_white.svg"}
              alt="search icon"
            />
            {/* UNIVERSAL SEARCH BAR */}
            <input
              onChange={(e) => {
                UpdateList(e.target.value);
                setSearchVal(e.target.value);
              }}
              className="bg-transparent dashboardsearch flex-grow tbase text-white"
              type="text"
              placeholder="Filter by title"
              value={searchval}
            />
          </div>
        )}
      </div>

      {/* LOWER SECTION */}
      <div className="w-full flex mt-2 h-[90%] flex-grow rounded-2xl">
        {/* FROM /DASHBOARD/HOME */}
        {homepageProjects && (
          <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl bg-white">
            {resultsshow && (
              <div className="w-full h-full">
                <div className="w-full flex flex-row items-center py-4 xl:py-6 px-2 justify-between">
                  <p className="tbasebold black mr-2 xl:mr-0">Test Title </p>
                  <div className="flex flex-row sm:w-[500px] md:w-[550px] xl:w-[700px] justify-between">
                    <span className="xl:hidden w-[1px] bg-gray-400"></span>
                    <p className="tbasebold xl:w-28 text-left mx-2 md:mx-4 black">
                      Test Type
                    </p>
                    <span className="w-[1px] bg-gray-400"></span>
                    <p className="tbasebold xl:w-28 text-left mx-2 md:mx-4 black">
                      Project Name
                    </p>
                    <span className="hidden lg:block w-[1px] bg-gray-400"></span>
                    <p className="hidden lg:block tbasebold xl:w-28 text-left mx-2 md:mx-4 black">
                      Date Created
                    </p>
                    <span className="hidden lg:block w-[1px] bg-gray-400"></span>
                    <p className="hidden lg:block tbasebold xl:w-28 text-left mx-2 md:mx-4 black">
                      Time Created
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col">
                  {searchedItems.map((project) => {
                    return project.results.map((result) => {
                      return (
                        <ResultInfo
                          key={uuidv4()}
                          result={result}
                          projectid={project._id}
                          resultid={result.id}
                        />
                      );
                    });
                  })}
                </div>
              </div>
            )}
            {!resultsshow && (
              <div className="w-full h-full flex justify-center items-center">
                YOU HAVE NO RESULTS CREATED YET
              </div>
            )}
          </div>
        )}

        {/* FROM /DASHBOARD/MYPROJECTS */}
        {projects && (
          <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl bg-white">
            {projects.length > 0 && (
              <div className="w-full h-full">
                <div className="w-full flex flex-row items-center py-2 xl:py-6 px-2 justify-between">
                  <p className="tbasebold black mr-4 xl:mr-0">Project Title </p>
                  <div className="flex flex-row justify-between w-76 sm:w-[180px] md:w-[250px] xl:w-[350px]">
                    <span className="xl:hidden w-[1px] bg-gray-400"></span>
                    <p className="tbasebold xl:w-28 flex items-center text-center mx-4 black">
                      Date Created
                    </p>
                    <span className="w-[1px] bg-gray-400"></span>
                    <p className="tbasebold xl:w-28 flex items-center text-center mx-4 black">
                      Time Created
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col">
                  {projects &&
                    searchedItems.map((project) => {
                      return <ProjectInfo key={uuidv4()} project={project} />;
                    })}
                </div>
              </div>
            )}
            {projects.length === 0 && (
              <div className="w-full h-full flex justify-center items-center">
                YOU HAVE NO PROJECTS CREATED YET
              </div>
            )}
          </div>
        )}

        {/* FROM /DASHBOARD/MYPROJECTS/PROJECTID */}
        {projectPageInfo && (
          <div className="w-full xl:max-h-full flex flex-col lg:flex-row flex-grow rounded-2xl">
            <div className="order-2 w-full lg:w-[50%] p-4 rounded-2xl flex flex-col bg-white">
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Project Title :</h2>
                <p className="my-2 rounded-2xl p-3 bg-gray-200">
                  {projectPageInfo.title}
                </p>
              </div>
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Project Description :</h2>
                <p className="my-2 rounded-2xl p-3 bg-gray-200">
                  {projectPageInfo.desc}
                </p>
              </div>
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Date of creation :</h2>
                <p className="my-2 rounded-2xl p-3 bg-gray-200">
                  {projectPageInfo.date}
                </p>
              </div>
              <div className="mb-3">
                <h2 className="tbasebold mb-4">Time created :</h2>
                <p className="my-2 rounded-2xl p-3 bg-gray-200">
                  {projectPageInfo.time}
                </p>
              </div>
              {/* EDIT AND DELETE PROJECT BUTTON */}
              <div className="my-5 w-full flex-grow flex flex-col justify-between items-center">
                <button
                  className="my-2"
                  onClick={() => {
                    router.push(
                      `/user/edit-project/${
                        session?.user._id || session?.user.id
                      }/${projectPageInfo._id}`
                    );
                  }}
                >
                  <Image
                    src={"/assets/svgs/edit.svg"}
                    width={24}
                    height={24}
                    alt="edit button"
                  />
                </button>
                <CanDelBtn
                  text={"DELETE PROJECT"}
                  addclass={"mx-auto my-2"}
                  action={() => {
                    setWarningHead(`Delete Project`);
                    setWarning(`Are you sure you want to delete this project?`);
                    ShowModal();
                  }}
                />
              </div>
            </div>
            <div className="lg:ml-4 w-full lg:order-2 lg:w-[50%] flex-grow max-h-full">
              {projectPageInfo.results.length > 0 && (
                <div
                  className={`${
                    projectPageInfo.results.length > 1
                      ? "flex flex-row overflow-x-scroll h-full lg:flex-col lg:overflow-y-scroll pr-0 lg:pr-2 "
                      : " "
                  }w-full h-full`}
                >
                  {projectPageInfo.results.map((result) => {
                    return (
                      <Link
                        key={uuidv4()}
                        href={`/user/dashboard/myprojects/${projectPageInfo._id}/${result.id}`}
                        className="flex flex-col py-6 px-8 mx-1 lg:mx-0 mb-2 xl:mb-3 bg-white h-max lg:h-max rounded-2xl w-96 lg:w-full hover:scale-95 transition-all"
                      >
                        {result.chosenchart == "Bar Chart" ? (
                          <BarChart
                            title={result.title}
                            subtitle={result.subtitle}
                            labels={result.labels}
                            comps={result.comps}
                            table={result.table}
                            size={{ height: 200, width: 400 }}
                          />
                        ) : (
                          <LineChart
                            title={result.title}
                            subtitle={result.subtitle}
                            labels={result.labels}
                            comps={result.comps}
                            table={result.table}
                            size={{ height: 200, width: 400 }}
                          />
                        )}
                        <div className="w-full">
                          <h2 className="tbasebold">{result.title}</h2>
                          <h2 className="tbasebold dorange">
                            {result.chosentest + " test result"}
                          </h2>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
              {projectPageInfo.results.length === 0 && (
                <div className="h-full w-full flex items-center justify-center bg-white rounded-2xl">
                  <h1>results under this project will show here</h1>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FROM /DASHBOARD/MYPROJECTS/PROJECTID/RESULTID */}
        {projectinfo && resultinfo && (
          <div className="w-full flex flex-col py-2 px-4 flex-grow rounded-2xl bg-white">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full order-2 lg:w-[50%] lg:p-4 max-h-full rounded-2xl flex flex-col bg-white">
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Title of result :</h2>
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">
                    {resultinfo.title}
                  </p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Test Type :</h2>
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">
                    {resultinfo.chosentest}
                  </p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Conclusion of result :</h2>
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">
                    {resultinfo.conclusion}
                  </p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Date of creation :</h2>
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">
                    {resultinfo.date}
                  </p>
                </div>
                <div className="mb-3">
                  <h2 className="tbasebold mb-4">Time created :</h2>
                  <p className="my-2 rounded-2xl p-3 bg-gray-200">
                    {resultinfo.time}
                  </p>
                </div>
              </div>
              {/* CHARTS AND DOWNLOAD BUTTON */}
              {resultinfo ? (
                <div className="lg:order-2 flex-grow flex flex-col items-center mb-12 lg:mb-3">
                  {/* THE CHARTs */}
                  {resultinfo.chosenchart == "Bar Chart" ? (
                    <BarChart
                      shuffle={true}
                      title={resultinfo.title}
                      subtitle={resultinfo.subtitle}
                      labels={resultinfo.labels}
                      comps={resultinfo.comps}
                      table={resultinfo.table}
                      size={{ height: 50, width: 100 }}
                    />
                  ) : (
                    <LineChart
                      shuffle={true}
                      title={resultinfo.title}
                      subtitle={resultinfo.subtitle}
                      labels={resultinfo.labels}
                      comps={resultinfo.comps}
                      table={resultinfo.table}
                      size={{ height: 50, width: 100 }}
                    />
                  )}
                  {/* DOWNLOAD AS PDF OR IMAGE */}
                  <div className="flex w-max mx-auto">
                    {/* PDF */}
                    <button
                      disabled={pdfloader}
                      onClick={() => {
                        downloadPDF();
                      }}
                      className="rounded-full mx-3 flex items-center justify-center border-black border-2 px-4 py-3"
                    >
                      <Image
                        className="mx-2"
                        src={"/assets/svgs/download_line.svg"}
                        width={24}
                        height={24}
                        alt="download button"
                      />
                      {pdfloader ? `downloading...` : `PDF`}
                    </button>
                    {/* Image */}
                    <button
                      disabled={imgloader}
                      onClick={() => {
                        downloadimage();
                      }}
                      className="rounded-full mx-3 flex items-center justify-center border-black border-2 px-4 py-3"
                    >
                      <Image
                        className="mx-2"
                        src={"/assets/svgs/download_line.svg"}
                        width={24}
                        height={24}
                        alt="download button"
                      />
                      {imgloader ? `downloading...` : `Image`}
                    </button>
                  </div>
                </div>
              ) : (
                <div>NO RESULT TO DISPLAY</div>
              )}
            </div>
            {/* EDIT AND DELETE BUTTON */}
            <div className="mx-auto mb-2 flex">
              <FillBLueBtn
                src={"/assets/svgs/edit_white.svg"}
                href={`/user/edit-result/${
                  session?.user._id || session?.user.id
                }/${projectinfo._id}/${resultinfo.id}`}
                text={"EDIT RESULT"}
                addclass={"mx-4"}
              />
              <CanDelBtn
                action={() => {
                  setWarningHead(`Delete Result`);
                  setWarning(`Are you sure you want to delete this result?`);
                  ShowModal();
                }}
                text={"DELETE RESULT"}
                addclass={"mx-4"}
              />
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {settings && settings}
      </div>
    </div>
  );
};

export default RightPane;
