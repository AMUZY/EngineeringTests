'use client'
import React, { useEffect, useState } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { normaltoast } from "@toasts/Toasts";
import { NormalBtn } from './Button';


const BarChart = ({title,subtitle,display,edit,labels, comps, table}) => {
  const [chartstate,setChartState] = useState(false)
  const [size,setSize] = useState({ height : 400 , width : 600})

  const UpdateData =()=>{
    let temparray = [];
    for (let i = 0; i < table.length; i++) {
      const dataobj = {
        label : comps[i],
        data : table[i],
        backgroundColor : [
          `rgba(${Math.floor(Math.random() * 255) + 1},${Math.floor(Math.random() * 255) + 1},${Math.floor(Math.random() * 255) + 1},1)`
        ],
        borderColor : [
          `rgba(${Math.floor(Math.random() * 255) + 1},${Math.floor(Math.random() * 255) + 1},${Math.floor(Math.random() * 255) + 1},1)`
        ],
        borderWidth : 1,
        borderRadius : 5,
        hoverBackgroundColor : [
          'rgba(222,0,0,.7)'
        ]
      }
      temparray.push(dataobj)
    }
    return temparray;
  }
  
  const [chart,setChart] = useState()


  function UpdateChart(){
    if(chartstate === false && table.length === 0 && edit === false){
      normaltoast(`add a column and row first`)
    }if(chartstate === false && table.length === 0 && edit === true){
      normaltoast(`edit data first`)
    }
    if(table.length > 0){
        setChartState(true)
        setChart(
          <Bar 
          className='my-6'
          data={{
            labels : labels,
            datasets : UpdateData() ,
          }}
          width={size.width}
          height={size.height}
          options={{
            maintainAspectRatio : true,
            scales : {
              y : {
                beginAtZero : true
              }
            },
            plugins : {
              title : {
                display : true,
                text : title ? title : 'Title shows here',
                font : {
                  size : 18,
                  family : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                  lineHeight : 1
                }
              },
              subtitle : {
                display : true,
                text : subtitle ? subtitle : 'SubTitle shows here',
                position : 'left',
                font : {
                  size : 16,
                  family : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                  lineHeight : 3
                }
              },
              legend : {
                labels : {
                  font : {
                    size : 14,
                    family : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    lineHeight : 1
                  }
                }
              }
            }
          }}
      />
      )
    }
  }

  useEffect(()=>{
    UpdateChart()
  },[edit,labels, comps, table])

  return (
    <div className='flex flex-col justify-center h-full w-full'>
      <div className='w-full h-full flex justify-center items-center'>
        {
          chart? 
          chart :
          <> NO CHART TO DISPLAY </>
        }
      </div>

      {/* BUTTON TO UPDATE */}
      {
        display && 
        <NormalBtn text={chartstate ? 'Update' : 'Display Chart'} action={UpdateChart} addclass='my-5 text-center w-full'/>
      }
      <ToastContainer />
    </div>
  )
}

export default BarChart