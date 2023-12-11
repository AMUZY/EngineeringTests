"use client";
import React, { useEffect, useState } from "react";
import { Bar, defaults } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "react-toastify/dist/ReactToastify.css";
import { normaltoast } from "@toasts/Toasts";
import { NormalBtn } from "./Button";
import {v4 as uuidv4} from "uuid"
import { memo,useCallback } from "react";

const BarChart = memo(({
  shuffle,
  title,
  subtitle,
  display,
  edit,
  labels,
  comps,
  table,
  size,
}) => {
  const [chartstate, setChartState] = useState(false);

  const UpdateData = useCallback(() => {
    let temparray = [];
    for (let i = 0; i < table.length; i++) {
      const dataobj = {
        label: comps[i],
        data: table[i],
        backgroundColor: [
          `rgba(${Math.floor(Math.random() * 255) + 1},${
            Math.floor(Math.random() * 255) + 1
          },${Math.floor(Math.random() * 255) + 1},1)`,
        ],
        borderColor: [
          `rgba(${Math.floor(Math.random() * 255) + 1},${
            Math.floor(Math.random() * 255) + 1
          },${Math.floor(Math.random() * 255) + 1},1)`,
        ],
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: ["rgba(222,0,0,.7)"],
      };
      temparray.push(dataobj);
    }
    return temparray;
  },[ title,subtitle,labels,comps,table ])

  const [chart, setChart] = useState();

  const UpdateChart = () => {
    if (chartstate === false && table.length === 0 && edit === false) {
      normaltoast(`add a column and row first`);
    }
    if (chartstate === false && table.length === 0 && edit === true) {
      normaltoast(`edit data first`);
    }
    if (table.length > 0) {
      setChartState(true);
      setChart(
        <Bar
          className="my-6"
          data={{
            labels: labels,
            datasets: UpdateData(),
          }}
          width={size.width}
          height={size.height}
          options={{
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: title ? title : "Title shows here",
                color: "black",
                font: {
                  size: 18,
                  family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                  lineHeight: 1,
                },
              },
              subtitle: {
                display: true,
                text: subtitle ? subtitle : "SubTitle shows here",
                color: "black",
                position: "left",
                font: {
                  size: 16,
                  family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                  lineHeight: 3,
                },
              },
              legend: {
                labels: {
                  color: "black",
                  font: {
                    size: 14,
                    family:
                      "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    lineHeight: 1,
                  },
                },
              },
            },
          }}
        />
      );
    }
  }

  useEffect(() => {
    UpdateChart();
  }, []);

  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="bg-white rounded-2xl capture w-full h-full flex justify-center items-center pb-4">
        {chart ? (
          <div className="w-full h-full">
            {chart}
            {shuffle && (
              <div className="flex flex-col pb-2">
                <div className="flex flex-row flex-wrap my-1">
                  <h2 className="mx-2 tbasebold"> Weight Percentages : </h2>
                  {labels.map((label) => {
                    return <h2 key = {uuidv4()} className="mx-1 tbase">{label},</h2>;
                  })}
                </div>
                <div className="flex flex-row flex-wrap my-1">
                  <h2 className="mx-2 tbasebold"> Reinforcements : </h2>
                  {comps.map((reinf) => {
                    return <h2 key = {uuidv4()} className="mx-1 tbase">{reinf},</h2>;
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-black"> NO CHART TO DISPLAY </p>
        )}
      </div>
      {shuffle && (
        <button
          className="mt-2 mb-4 mx-auto text-red-600 hover:text-gray-600"
          onClick={() => UpdateChart()}
        >
          Reshuffle colors
        </button>
      )}

      {/* BUTTON TO UPDATE */}
      {display && (
        <>
          <NormalBtn
            text={chartstate ? "Update Chart" : "Display Chart"}
            action={UpdateChart}
            addclass="my-5 text-center w-full tbase t_col hover:text-[#ff6700]"
          />
          {/* <ToastContainer /> */}
        </>
      )}
    </div>
  );
});

export default memo(BarChart);
