"use client";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import BarChart from "@components/BarChart";
import LineChart from "@components/LineChart";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { testTypes, chartTypes } from "@components/TestTypes";
import { NoDuplicate } from "@components/NoDuplicate";
import { failuretoast } from "@toasts/Toasts";
import { ToastContainer } from "react-toastify";
import { inputstyle, labelstyle, inputcont } from "@components/TestTypes";
import Image from "next/image";
import { AutoFull, AutoWidth } from "@components/TestTypes";
import { SaveBtn, NormalBtn, CanDelBtn } from "@components/Button";
import { useRouter } from "next/navigation";
import { promisetoast } from "@toasts/Toasts";

const page = ({ params }) => {
  const router = useRouter();

  const [result, setResult] = useState();
  const [id, setId] = useState();
  // ALL INFORMATION BY THE USER
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
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
  const titleref = useRef();
  const subtitleref = useRef();
  const concref = useRef();
  const [charts, setCharts] = useState();
  const [backupcharts, setBackUpCharts] = useState();
  const [testobj, setTestobj] = useState();
  const [show, setShow] = useState(false);
  const [istable, setIsTable] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(0);

  const columnoptions = Array.from({ length: 10 }, (_, i) => i + 1).map(String);
  const rowoptions = Array.from({ length: 5 }, (_, i) => i + 1).map(String);

  // BELOW ARE THE ARRAYS TO STORE THE INDEXES AND VALUES OF ITEMS IN THE TABLE
  const [labelsindex, setLabelsIndex] = useState([]);
  const [compsindex, setCompsIndex] = useState([]);
  const [tableindex, setTabelIndex] = useState([]);

  //
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = new Promise(async (res, rej) => {
      await axios
        .get(`/api/project/other-http/${params._id}/${params.projectid}`)
        .then((response) => {
          let data = response.data;
          setChosenProject(data.title);
          data.results.forEach((result) => {
            if (params.resultid === result.id) {
              setResult(result);
              setIsTable(true);
              setCharts(data.results);
              setBackUpCharts(data.results);
              setColumns(result.labels);
              setRows(result.comps);
              setTable(result.table);
              setId(result.id);
              setShow(true);
            }
          });
          res();
        })
        .catch((error) => {
          rej();
        });
    });

    promisetoast(
      fetchProjects,
      "Fetching result info...",
      "Result info fetched",
      "Failed to fetch result info, please refresh or check your internet"
    );
  }, []);

  useEffect(() => {
    if (result) {
      titleref.current.value = result.title;
      setTitle(result.title);
      subtitleref.current.value = result.subtitle;
      setSubTitle(result.subtitle);
      concref.current.value = result.conclusion;
      setConclusion(result.conclusion);
      setChosenTest(result.chosentest);
      for (let i = 0; i < testTypes.length; i++) {
        if (result.chosentest == testTypes[i].label) {
          setTestobj(testTypes[i]);
        }
      }
      setChosenChart(result.chosenchart);
      setChosenUnit(result.chosenunit);
    }
  }, [result]);

  const handleEdit = async (
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
        .put(`/api/project/other-http/${params._id}/${params.projectid}`, {
          id,
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
          router.push(`/dashboard/home`);
        })
        .catch(() => {
          rej();
        });
    });

    promisetoast(
      AwaitResultCreate,
      "editing result...",
      "Result edited successfully",
      "Couldn't edit result"
    );
  };

  useEffect(() => {
    if (disabled === true) {
      // FUNCTION TO PUSH ALL DATA TO THE DATABASE
      handleEdit(
        columns,
        rows,
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
      );
    }
  }, [date, time]);

  const GetIndexes = () => {
    let templabelarray = [];
    let tempcompsarray = [];
    let temptable = [];
    result.labels.map((label) => {
      let tempobj = {
        index: result.labels.indexOf(label),
        value: label,
      };
      templabelarray.push(tempobj);
    });
    result.comps.map((comp) => {
      let tempobj = {
        index: result.comps.indexOf(comp),
        value: comp,
      };
      tempcompsarray.push(tempobj);
    });
    result.table.map((row) => {
      let temparray = [];
      row.map((item) => {
        let tempobj = {
          index: row.indexOf(item),
          value: item,
        };
        temparray.push(tempobj);
      });
      temptable.push(temparray);
    });
    setLabelsIndex(templabelarray);
    setCompsIndex(tempcompsarray);
    setTabelIndex(temptable);
    setIsTable(false);
  };

  istable && GetIndexes();

  function DisableAutoComplete() {
    if (
      chosenchart.length <= 0 ||
      chosentest.length <= 0 ||
      chosenunit.length <= 0 ||
      title.length <= 0 ||
      subtitle.length <= 0 ||
      conclusion.length <= 0
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

  function SaveDateAndTime() {
    setDate(
      `${getDate.getDate()}-${getDate.getMonth() + 1}-${getDate.getFullYear()}`
    );
    setTime(formatAMPM(getDate));
  }

  function UpdateColumn(oldval, newval) {
    let temparray = columns;
    for (let i = 0; i < columns.length; i++) {
      if (oldval == labelsindex[i].value) {
        if (newval.length > 0) {
          temparray[i] = newval;
          setColumns(temparray);
        } else {
          temparray[i] = labelsindex[i].value;
          setColumns(temparray);
        }
      }
    }
  }
  function UpdateRows(oldval, newval) {
    let temparray = rows;
    for (let i = 0; i < rows.length; i++) {
      if (oldval == compsindex[i].value) {
        if (newval.length > 0) {
          temparray[i] = newval;
          setRows(temparray);
        } else {
          temparray[i] = compsindex[i].value;
          setRows(temparray);
        }
      }
    }
  }
  function UpdateCell(oldval, newval) {
    let temparray = table;
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        if (oldval == tableindex[i][j].value) {
          if (newval.length > 0) {
            console.log("equals");
            temparray[i][j] = newval;
            setTable(temparray);
          } else {
            temparray[i][j] = tableindex[i][j].value;
            setTable(temparray);
          }
        }
      }
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

  return (
    <>
      <ToastContainer />
      {show && (
        <div>
          <div className="w-full h-full p-6">
            <div className="flex-grow h-full dashbox overflow-y-scroll rounded-3xl p-3 flex flex-col justify-between">
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
                    <p className="tsubtitle black"> Edit Result </p>
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
                            ref={titleref}
                            className={
                              inputstyle + " w-[300px] overflow-ellipsis"
                            }
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
                            ref={subtitleref}
                            className={
                              inputstyle + " w-[300px] overflow-ellipsis"
                            }
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
                          disabled={true}
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
                              label="No of Columns"
                            />
                          )}
                        />

                        <Autocomplete
                          onChange={(event, value) => {
                            AddRow(value);
                          }}
                          fullWidth={AutoFull.state}
                          disabled={true}
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
                              label="No of Rows"
                            />
                          )}
                        />
                      </div>

                      <div className="flex my-3 flex-row flex-wrap w-full justify-between">
                        <Autocomplete
                          value={chosentest}
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
                            <TextField
                              {...params}
                              key={params}
                              label="Test Type"
                            />
                          )}
                        />

                        <Autocomplete
                          value={chosenunit}
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
                          onChange={(event, value) => {}}
                          fullWidth={AutoFull.state}
                          disabled={true}
                          disablePortal
                          id="combo-box-demo"
                          options={[]}
                          sx={AutoWidth}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.label}>
                                {option.label}
                              </li>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              key={params}
                              label="Project"
                            />
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
                        action={DisableAutoComplete}
                        addclass="mx-2"
                      />
                      <div className="overflow-y-scroll w-full">
                        {/* TABLE */}
                        <div className="table mt-4 mx-auto">
                          <div className="entire_column">
                            <div className="column_cell"></div>
                            {result.labels.map((column) => {
                              return (
                                <input
                                  key={uuidv4()}
                                  onBlur={(e) => {
                                    if (CheckIfSettingSaved()) {
                                      let tempstr = e.target.value;
                                      UpdateColumn(column, tempstr);
                                    }
                                  }}
                                  className="column_cell"
                                  placeholder={
                                    result.labels[result.labels.indexOf(column)]
                                  }
                                />
                              );
                            })}
                          </div>
                          <div className="rows2">
                            <div className="flex flex-col">
                              {result.comps.map((comp) => {
                                return (
                                  <input
                                    key={uuidv4()}
                                    className="row_cell"
                                    onBlur={(e) => {
                                      if (CheckIfSettingSaved()) {
                                        let tempstr = e.target.value;
                                        UpdateRows(comp, tempstr);
                                      }
                                    }}
                                    placeholder={comp}
                                  />
                                );
                              })}
                            </div>
                            <div className="flex flex-col">
                              {result.table.map((row) => {
                                return (
                                  <div key={uuidv4()} className="entire_row">
                                    {row.map((item) => {
                                      return (
                                        <input
                                          key={uuidv4()}
                                          className="row_input"
                                          onBlur={(e) => {
                                            if (CheckIfSettingSaved()) {
                                              let tempstr = e.target.value;
                                              if (
                                                NoDuplicate(
                                                  tempstr,
                                                  result.table,
                                                  item
                                                ) == tempstr
                                              ) {
                                                UpdateCell(
                                                  item,
                                                  NoDuplicate(
                                                    tempstr,
                                                    table,
                                                    item
                                                  )
                                                );
                                              } else {
                                                failuretoast(
                                                  "Value already exists in a cell"
                                                );
                                                e.target.value = "";
                                              }
                                            }
                                          }}
                                          placeholder={
                                            result.table[
                                              result.table.indexOf(row)
                                            ][row.indexOf(item)]
                                          }
                                        />
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/2 lg:p-3 h-full overflow-y-scroll justify-between">
                  <p className="tbase black"> Preview :</p>
                  {/* THE CHARTs */}
                  {chosenchart == "Bar Chart" ? (
                    <BarChart
                      title={result.title}
                      subtitle={result.subtitle}
                      display={true}
                      edit={true}
                      labels={result.labels}
                      comps={result.comps}
                      table={result.table}
                      size={{ height: 50, width: 100 }}
                    />
                  ) : (
                    <LineChart
                      title={result.title}
                      subtitle={result.subtitle}
                      display={true}
                      edit={true}
                      labels={result.labels}
                      comps={result.comps}
                      table={result.table}
                      size={{ height: 50, width: 100 }}
                    />
                  )}
                </div>
              </div>
              <div className="flex mx-auto mt-8 mb-16">
                <SaveBtn
                  text="Save Result"
                  action={() => {
                    if (CheckIfSettingSaved()) {
                      SaveDateAndTime();
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
          </div>
        </div>
      )}
    </>
  );
};

export default page;
