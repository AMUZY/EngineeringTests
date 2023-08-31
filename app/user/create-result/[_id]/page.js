"use client";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { failuretoast, normaltoast, promisetoast } from "@toasts/Toasts";
import BarChart from "@components/BarChart";
import LineChart from "@components/LineChart";
import { testTypes, chartTypes } from "@components/TestTypes";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { NoDuplicate } from "@components/NoDuplicate";
import { inputstyle, labelstyle, inputcont } from "@components/TestTypes";
import Image from "next/image";
import { AutoFull, AutoWidth } from "@components/TestTypes";
import { SaveBtn, NormalBtn, CanDelBtn } from "@components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  //  FETCHED PROJECTS
  const [allprojects, setAllProjects] = useState([]);
  const [chosenid, setChosenId] = useState();
  // ALL INFORMATION FROM USER
  const [labels, setLabels] = useState([]);
  const [comps, setComps] = useState([]);
  const [table, setTable] = useState([]);
  const [chosentest, setChosenTest] = useState("");
  const [chosenunit, setChosenUnit] = useState("");
  const [chosenchart, setChosenChart] = useState("");
  const [chosenproject, setChosenProject] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  // OTHER USED DATA
  const getDate = new Date();
  const concref = useRef();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [columnno, setColumnNo] = useState(0);
  const [rowno, setRowNo] = useState(0);
  const [show, setShow] = useState(false);
  const [testobj, setTestobj] = useState();

  const router = useRouter();

  // THE DISABLED FOR THE AUTOCOMPLETE COMPONENT
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(0);

  const columnoptions = Array.from({ length: 10 }, (_, i) => i + 1).map(String);
  const rowoptions = Array.from({ length: 5 }, (_, i) => i + 1).map(String);

  useEffect(() => {
    const fetchProjects = new Promise(async (res, rej) => {
      await axios
        .get(`/api/project/other-http/${params._id}/undefined`)
        .then((response) => {
          const data = response.data;
          let temptitles = [];
          for (let i = 0; i < data.length; i++) {
            temptitles.push({
              label: data[i].title,
              id: data[i]._id,
            });
          }
          setAllProjects(temptitles);
          res();
        })
        .catch((error) => {
          normaltoast("Or Create a project first");
          rej();
          window.history.back();
        });
    });

    promisetoast(
      fetchProjects,
      "Fetching projects...",
      "Projects fetched",
      "Failed to fetch projects, please refresh or check your internet"
    );
  }, []);

  const handleCreate = async (
    labels,
    comps,
    title,
    subtitle,
    table,
    date,
    time,
    chosentest,
    chosenunit,
    chosenchart,
    chosenproject,
    conclusion
  ) => {
    const AwaitResultCreate = new Promise(async (res, rej) => {
      await axios
        .put(`/api/project/other-http/${params._id}/${chosenid}`, {
          labels,
          comps,
          title,
          subtitle,
          table,
          date,
          time,
          chosentest,
          chosenunit,
          chosenchart,
          chosenproject,
          conclusion,
        })
        .then(() => {
          res();
          router.push(`/user/dashboard/home`);
        })
        .catch(() => {
          rej();
        });
    });

    promisetoast(
      AwaitResultCreate,
      "Creating result...",
      "Result created successfully",
      "Couldn't create result"
    );
  };

  // FUNCTIONS
  function AddColumn(num) {
    let newnum = parseInt(num);
    let tempcolarray = [];
    for (let i = 0; i < newnum; i++) {
      tempcolarray.push([]);
    }
    setColumns(tempcolarray);
    let temprowarray = [];
    for (let i = 0; i < rowno; i++) {
      temprowarray.push(
        tempcolarray.map(() => {
          return [];
        })
      );
    }
    setRows(temprowarray);
    if (newnum > 0) {
      setColumnNo(newnum);
    } else {
      setColumnNo(0);
    }
    if (rowno > 0) {
      setTable(new Array(rowno));
    } else {
      setRowNo(0);
    }
    setShow(true);
  }

  function AddRow(num) {
    let newnum = parseInt(num);
    let temprowarray = [];
    for (let i = 0; i < newnum; i++) {
      temprowarray.push(
        columns.map(() => {
          return [];
        })
      );
    }
    setRows(temprowarray);
    if (newnum > 0) {
      setTable(new Array(newnum));
      setRowNo(newnum);
    } else {
      setRowNo(0);
    }
  }

  function DisableAutoComplete() {
    if (
      rowno <= 0 ||
      columnno <= 0 ||
      chosentest.length <= 0 ||
      chosenunit.length <= 0 ||
      title.length <= 0 ||
      subtitle.length <= 0 ||
      conclusion.length <= 0 ||
      allprojects.length <= 0 ||
      chosenchart.length <= 0
    ) {
      failuretoast("Fill all fields before saving");
    } else {
      setDisabled(true);
    }
  }
  function CheckIfSettingSaved() {
    if (disabled === false) {
      failuretoast("Save chart settings first");
      setCount(count + 1);
    } else {
      return true;
    }
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function SaveDateAndTime() {
    setDate(
      `${getDate.getDate()}-${getDate.getMonth() + 1}-${getDate.getFullYear()}`
    );
    setTime(formatAMPM(getDate));
  }

  useEffect(() => {
    if (title.length > 0 && subtitle.length > 0) {
      handleCreate(
        labels,
        comps,
        title,
        subtitle,
        table,
        date,
        time,
        chosentest,
        chosenunit,
        chosenchart,
        chosenproject.label,
        conclusion
      );
    }
  }, [date, time]);

  return (
    <div className="w-full h-full p-2 lg:p-6">
      <ToastContainer />
      {allprojects.length > 0 ? (
        <div className="flex-grow dashbox overflow-y-scroll rounded-3xl p-3 flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row h-full w-full">
            <div className="flex flex-col w-full lg:w-1/2 lg:p-3">
              <div className="flex items-center">
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
                <p className="tsubtitle black"> Create Result </p>
              </div>
              <div className="flex flex-col h-full overflow-y-scroll">
                {/* INPUT TAGS */}
                <main className="relative flex flex-col justify-evenly p-3">
                  {/* INPUTS */}
                  <div className="flex flex-row flex-wrap w-full justify-between">
                    <div className={inputcont}>
                      <label className={labelstyle} htmlFor="title">
                        {" "}
                        Title :{" "}
                      </label>
                      <input
                        disabled={disabled}
                        required
                        type="text"
                        className={inputstyle + " w-[300px] overflow-ellipsis"}
                        id="title"
                        placeholder="e.g My new chart"
                        onBlur={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className={inputcont}>
                      <label className={labelstyle} htmlFor="">
                        {" "}
                        Subtitle :
                      </label>
                      <input
                        disabled={disabled}
                        required
                        type="text"
                        className={inputstyle + " w-[300px] overflow-ellipsis"}
                        id=""
                        placeholder="e.g My new Flexural Test (MPa)"
                        onBlur={(e) => {
                          setSubTitle(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex my-3 flex-row flex-wrap w-full justify-between">
                    <Autocomplete
                      onChange={(event, value) => {
                        AddColumn(value);
                      }}
                      fullWidth={AutoFull.state}
                      disabled={disabled}
                      disablePortal
                      id="combo-box-demo"
                      options={columnoptions}
                      sx={AutoWidth}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          key={params}
                          label="No of weight percentages"
                        />
                      )}
                    />

                    <Autocomplete
                      onChange={(event, value) => {
                        AddRow(value);
                      }}
                      fullWidth={AutoFull.state}
                      disabled={disabled}
                      disablePortal
                      id="combo-box-demo"
                      options={rowoptions}
                      sx={AutoWidth}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          key={params}
                          label="No of Reinforcements"
                        />
                      )}
                    />
                  </div>

                  <div className="flex my-3 flex-row flex-wrap w-full justify-between">
                    <Autocomplete
                      onChange={(event, value) => {
                        if (value) {
                          setTestobj(value);
                          setChosenTest(value.label);
                        } else {
                          setTestobj({ units: [] });
                          setChosenTest("");
                        }
                      }}
                      fullWidth={AutoFull.state}
                      disabled={disabled}
                      disablePortal
                      id="combo-box-demo"
                      options={testTypes}
                      sx={AutoWidth}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.label}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} key={params} label="Test Type" />
                      )}
                    />

                    <Autocomplete
                      onChange={(event, value) => {
                        if (value) {
                          setChosenUnit(value);
                        } else {
                          setChosenUnit("");
                        }
                      }}
                      fullWidth={AutoFull.state}
                      disabled={disabled}
                      disablePortal
                      id="combo-box-demo"
                      options={testobj ? testobj.units : []}
                      sx={AutoWidth}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} key={params} label="Unit" />
                      )}
                    />
                  </div>
                  <div className="flex my-3 flex-row flex-wrap w-full justify-between">
                    <Autocomplete
                      value={chosenchart}
                      onChange={(event, value) => {
                        if (value) {
                          setChosenChart(value);
                        } else {
                          setChosenChart("");
                        }
                      }}
                      fullWidth={AutoFull.state}
                      disabled={disabled}
                      disablePortal
                      id="combo-box-demo"
                      options={chartTypes}
                      sx={AutoWidth}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          key={params}
                          label="Chart Type"
                        />
                      )}
                    />

                    <Autocomplete
                      value={chosenproject}
                      onChange={(event, value) => {
                        if (value) {
                          setChosenProject(value);
                          setChosenId(value.id);
                        } else {
                          setChosenProject("");
                        }
                        console.log(chosenid);
                      }}
                      fullWidth={AutoFull.state}
                      disabled={disabled}
                      disablePortal
                      id="combo-box-demo"
                      options={allprojects}
                      sx={AutoWidth}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.label}>
                            {option.label}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} key={params} label="Project" />
                      )}
                    />
                  </div>

                  {/* CONCLUSION */}
                  <div className="w-full flex flex-col my-3">
                    <label className={labelstyle} htmlFor="">
                      {" "}
                      {`Conclusion of Result (Max 300 characters) :`}
                    </label>
                    <input
                      disabled={disabled}
                      required
                      type="text"
                      ref={concref}
                      className={
                        inputstyle + " w-full text-left overflow-ellipsis"
                      }
                      id=""
                      placeholder="Conclusion of result"
                      onChange={(e) => {
                        if (e.target.value.trim().length >= 301) {
                          failuretoast("max 300 characters reached");
                        } else {
                          setConclusion(e.target.value);
                        }
                      }}
                      value={conclusion}
                    />

                    <span className="text-gray-400">{`${
                      concref.current
                        ? 300 - concref.current.value.trim().length
                        : 300
                    } character(s) left*`}</span>
                  </div>

                  <NormalBtn
                    text="Save Settings"
                    action={() => DisableAutoComplete()}
                    addclass="mx-2"
                  />

                  {show ? (
                    <p className="text-xl">
                      {" "}
                      {`${columnno ? columnno : 0} column(s) and ${
                        rowno ? rowno : 0
                      } row(s)`}{" "}
                    </p>
                  ) : null}
                  {/* MAIN TABLE OVERFLOW DIV */}
                  <div className="overflow-y-scroll w-full">
                    {/* TABLE */}
                    <div className="table mt-4 mx-auto">
                      <div>
                        {columns.length > 0 ? (
                          <div className="entire_column">
                            <div className="column_cell"></div>
                            {columns.map((column) => {
                              return (
                                <input
                                  onBlur={(e) => {
                                    if (CheckIfSettingSaved()) {
                                      let tempstr = e.target.value;
                                      labels[columns.indexOf(column)] = tempstr;
                                    }
                                  }}
                                  key={uuidv4()}
                                  value={labels[columns.indexOf(column)]}
                                  className="column_cell"
                                  placeholder={`wt% ${
                                    columns.indexOf(column) + 1
                                  }`}
                                />
                              );
                            })}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="rows">
                        {rows.map((row) => {
                          let temprowarray = new Array(row.length);
                          return (
                            <div key={uuidv4()} className="entire_row">
                              <input
                                onBlur={(e) => {
                                  if (CheckIfSettingSaved()) {
                                    let tempstr = e.target.value;
                                    comps[rows.indexOf(row)] = tempstr;
                                  }
                                }}
                                className="row_cell"
                                value={comps[rows.indexOf(row)]}
                                placeholder={`reinf ${rows.indexOf(row) + 1}`}
                              />
                              {row.map((item) => {
                                return (
                                  <input
                                    onBlur={(e) => {
                                      if (CheckIfSettingSaved()) {
                                        let tempstr = Number(e.target.value);
                                        if (table[0]) {
                                          if (
                                            temprowarray[row.indexOf(item)] !=
                                            tempstr
                                          ) {
                                            if (
                                              typeof NoDuplicate(
                                                tempstr,
                                                table
                                              ) == "number"
                                            ) {
                                              temprowarray[row.indexOf(item)] =
                                                NoDuplicate(tempstr, table);
                                              table[rows.indexOf(row)] =
                                                temprowarray;
                                            } else {
                                              failuretoast(
                                                "Value already exists in a cell"
                                              );
                                              e.target.value = 0;
                                              temprowarray[
                                                row.indexOf(item)
                                              ] = 0;
                                              table[rows.indexOf(row)] =
                                                temprowarray;
                                            }
                                          }
                                        } else {
                                          temprowarray[row.indexOf(item)] =
                                            tempstr;
                                          table[rows.indexOf(row)] =
                                            temprowarray;
                                        }
                                      }
                                    }}
                                    key={uuidv4()}
                                    className="row_input"
                                    value={
                                      table[rows.indexOf(row)] &&
                                      table[rows.indexOf(row)][
                                        row.indexOf(item)
                                      ]
                                    }
                                    placeholder={`col ${
                                      row.indexOf(item) + 1
                                    }, row ${rows.indexOf(row) + 1}`}
                                  />
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* button to set date and time */}
                  {/* <button onClick={()=>{setDate(`${getDate.getDay()}-${getDate.getMonth()+1}-${getDate.getFullYear()}`) ; setTime(`${getDate.getHours()}:${getDate.getMinutes()}`)}}> show date and time </button> */}
                </main>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 lg:p-3 overflow-y-scroll justify-between">
              <p className="tbase black"> Preview :</p>
              {/* THE CHARTs */}
              {chosenchart == "Bar Chart" ? (
                <BarChart
                  title={title}
                  subtitle={subtitle}
                  display={true}
                  labels={labels}
                  comps={comps}
                  table={table}
                  size={{ height: 400, width: 600 }}
                />
              ) : (
                <LineChart
                  title={title}
                  subtitle={subtitle}
                  display={true}
                  labels={labels}
                  comps={comps}
                  table={table}
                  size={{ height: 400, width: 600 }}
                />
              )}
            </div>
          </div>
          <div className="flex mx-auto mt-8 mb-16">
            <SaveBtn
              text="Done"
              action={() => {
                if (comps.length > 0 && table.length > 0) {
                  SaveDateAndTime();
                } else {
                  failuretoast("Please fill in tables?");
                }
              }}
              addclass="mx-2"
            />
            <CanDelBtn
              text="Cancel"
              action={() => {
                window.history.back();
              }}
              addclass="mx-2"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          {" "}
          YOU HAVE TO CREATE A PROJECT FIRST{" "}
        </div>
      )}
    </div>
  );
};

export default page;
