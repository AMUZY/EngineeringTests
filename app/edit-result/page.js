'use client'
import React, { useState,useEffect,useRef } from "react"
import {v4 as uuidv4} from 'uuid';
import BarChart from "@components/BarChart";
import LineChart from "@components/LineChart";
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { testTypes,chartTypes } from "@components/TestTypes";
import { NoDuplicate } from "@components/NoDuplicate";
import { failuretoast } from "@toasts/Toasts";
import { ToastContainer } from "react-toastify";
import { inputstyle,labelstyle,inputcont } from "@components/TestTypes";
import Image from "next/image"
import { SaveBtn,NormalBtn,CanDelBtn } from '@components/Button'

const page = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

     // ALL INFORMATION BY THE USER
    const [columns,setColumns] = useState([])
    const [rows,setRows] = useState([])
    const [table,setTable] = useState([])
    const [chosentest,setChosenTest] = useState('')
    const [chosenunit,setChosenUnit] = useState('')
    const [chosenchart,setChosenChart] = useState('')
    const [title,setTitle] = useState("")
    const [subtitle,setSubTitle] = useState("")
    const [conclusion,setConclusion] = useState("")
    const [date,setDate] = useState()
    const [time,setTime] = useState()


    // OTHER USED DATA
    const getDate = new Date()
    const titleref = useRef()
    const subtitleref = useRef()
    const concref = useRef()
    const [charts,setCharts] = useState()
    const [backupcharts,setBackUpCharts] = useState()
    const [testobj,setTestobj] = useState()
    const [show,setShow] = useState(false)
    const [istable,setIsTable] = useState(false)

    const [disabled,setDisabled] = useState(false)
    const [count,setCount] = useState(0)

    const columnoptions = Array.from({length: 10}, (_, i) => i + 1).map(String)
    const rowoptions = Array.from({length: 5}, (_, i) => i + 1).map(String)

    // BELOW ARE THE ARRAYS TO STORE THE INDEXES AND VALUES OF ITEMS IN THE TABLE
    const [labelsindex,setLabelsIndex] = useState([])
    const [compsindex,setCompsIndex] = useState([])
    const [tableindex,setTabelIndex] = useState([])
    

    useEffect(()=>{
        const GetData = async ()=>
        await axios.get('/api/demo')
        .then((response)=>{
            let data = response.data;
            setIsTable(true)
            setCharts(data)
            setBackUpCharts(data)
            setColumns(data[id].labels)
            setRows(data[id].comps)
            setTable(data[id].table)
            setShow(true)
        }).catch((error)=>{
            console.log(error.response.data)
        })
        GetData()

    },[])

    useEffect(()=>{
        if(charts){
            titleref.current.value = charts[id].title;
            setTitle(charts[id].title)
            subtitleref.current.value = charts[id].subtitle;
            setSubTitle(charts[id].subtitle)
            concref.current.value = charts[id].conclusion;
            setConclusion(charts[id].conclusion)
            setChosenTest(charts[id].testtype)
            for(let i = 0;i < testTypes.length ; i++){
                if(charts[id].testtype == testTypes[i].label){
                    setTestobj(testTypes[i])
                }
            }
            setChosenChart(charts[id].charttype)
            setChosenUnit(charts[id].unit)
        }
    },[charts])

    
    const GetIndexes = ()=>{
        let templabelarray = [];
        let tempcompsarray = [];
        let temptable = [];
        backupcharts[id].labels.map((label)=>{
            let tempobj = {
                index : backupcharts[id].labels.indexOf(label),
                value : label
            }
            templabelarray.push(tempobj)
        })
        backupcharts[id].comps.map((comp)=>{
            let tempobj = {
                index : backupcharts[id].comps.indexOf(comp),
                value : comp
            }
            tempcompsarray.push(tempobj)
        })
        backupcharts[id].table.map((row)=>{
            let temparray = [];
            row.map((item)=>{
                let tempobj = {
                    index : row.indexOf(item),
                    value : item
                }
                temparray.push(tempobj)
            })
            temptable.push(temparray)
        })
        setLabelsIndex(templabelarray)
        setCompsIndex(tempcompsarray)
        setTabelIndex(temptable)
        setIsTable(false)
    }

    
    istable && GetIndexes()
           
    function DisableAutoComplete(){
        if(chosenchart.length <= 0 || chosentest.length <= 0 || chosenunit.length <= 0 || title.length <= 0 || subtitle.length <= 0 || conclusion.length <= 0){
            failuretoast('Fill all fields before saving')
        }else{
            setDisabled(true)
        }
    }
    function CheckIfSettingSaved(){
        if(disabled === false){
            failuretoast('Save chart settings first')
            setCount(count+1)
        }else{
            return true
        }
    }
   

    function UpdateColumn(oldval, newval){
        let temparray = columns
        for (let i = 0; i < columns.length; i++) {
            if(oldval == labelsindex[i].value){
                if(newval.length > 0){
                temparray[i] = newval
                setColumns(temparray)
                }else{
                    temparray[i] = labelsindex[i].value;
                    setColumns(temparray)
                }
            }
        }
    }
    function UpdateRows(oldval,newval){
        let temparray = rows
        for (let i = 0; i < rows.length; i++) {
            if(oldval == compsindex[i].value){
                if(newval.length > 0){
                temparray[i] = newval
                setRows(temparray)
                }else{
                    temparray[i] = compsindex[i].value;
                    setRows(temparray)
                }
            }
        }
    }
    function UpdateCell(oldval,newval){
        let temparray = table
        for (let i = 0; i < table.length; i++) {
            for(let j = 0; j < table[i].length ; j++){
                if(oldval == tableindex[i][j].value){
                    if(newval.length > 0){
                    console.log('equals')
                    temparray[i][j] = newval
                    setTable(temparray)
                    }else {
                        temparray[i][j] = tableindex[i][j].value;
                        setTable(temparray)
                    }
                }
            }
        }
    }
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

  return (
    <>
    {show && 
    <div>
        <div className='w-full h-full p-6'>
            <div className='flex-grow h-full dashbox overflow-y-scroll rounded-3xl p-3 flex flex-col justify-between'>
                <div className='flex flex-row h-full w-full'>
                    <div className='flex flex-col w-1/2 p-3'>
                        <div className='flex items-center'>
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
                        <div className='flex flex-col h-full overflow-y-scroll'>
                            {/* INPUT TAGS */}
                            <main className="relative flex flex-col justify-evenly p-3">
                            <ToastContainer />
                            {/* INPUTS */}
                            <div className="flex flex-row flex-wrap w-full justify-between">
                                <div className={inputcont}>
                                    <label className={labelstyle} htmlFor="title"> Title : </label>
                                    <input disabled={disabled} required type="text" ref={titleref} className={inputstyle + " w-[300px] overflow-ellipsis"} id="title" placeholder="e.g My new chart" onBlur={(e)=>{setTitle(e.target.value)}}/>
                                </div>
                                <div className={inputcont}>
                                    <label className={labelstyle} htmlFor=""> Subtitle :</label>
                                    <input disabled={disabled} required type="text" ref={subtitleref} className={inputstyle + " w-[300px] overflow-ellipsis"} id="" placeholder="e.g My new Flexural Test (MPa)" onBlur={(e)=>{setSubTitle(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="flex my-3 flex-row flex-wrap w-full justify-between">
                            <Autocomplete
                                onChange={(event,value)=>{
                                    AddColumn(value)
                                }}
                                disabled = {true}
                                disablePortal
                                id="combo-box-demo"
                                options={columnoptions}
                                sx={{ width: 300 }}
                                renderOption={(props, option) => {
                                    return (
                                    <li {...props} key={option}>
                                        {option}
                                    </li>
                                    )
                                }}
                                renderInput={(params) => <TextField {...params} key={params} label="No of Columns" />}
                                />

                                
                                <Autocomplete
                                onChange={(event,value)=>{
                                    AddRow(value)
                                }}
                                disabled = {true}
                                disablePortal
                                id="combo-box-demo"
                                options={rowoptions}
                                sx={{ width: 300 }}
                                renderOption={(props, option) => {
                                    return (
                                    <li {...props} key={option}>
                                        {option}
                                    </li>
                                    )
                                }}
                                renderInput={(params) => <TextField {...params} key={params} label="No of Rows" />}
                                />
                            </div>

                            <div className="flex my-3 flex-row flex-wrap w-full justify-between">
                            <Autocomplete
                                value={chosentest}
                                onChange={(event,value)=>{
                                    if(value){
                                        setTestobj(value)
                                        setChosenTest(value.label)
                                    }else{
                                        setTestobj({units : []})
                                        setChosenTest('')
                                    }
                                }}
                                disabled = {disabled}
                                disablePortal
                                id="combo-box-demo"
                                options={testTypes}
                                sx={{ width: 300 }}
                                renderOption={(props, option) => {
                                    return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                    )
                                }}
                                renderInput={(params) => <TextField {...params} key={params} label="Test Type" />}
                                />

                                
                                <Autocomplete
                                value={chosenunit}
                                onChange={(event,value)=>{
                                    if(value){
                                        setChosenUnit(value)
                                    }else{
                                        setChosenUnit('')
                                    }
                                }}
                                disabled = {disabled}
                                disablePortal
                                id="combo-box-demo"
                                options={testobj ? testobj.units : []}
                                sx={{ width: 300 }}
                                renderOption={(props, option) => {
                                    return (
                                    <li {...props} key={option}>
                                        {option}
                                    </li>
                                    )
                                }}
                                renderInput={(params) => <TextField {...params} key={params} label="Unit" />}
                                />
                            </div>
                            <div className="flex my-3 flex-row flex-wrap w-full justify-between">
                                <Autocomplete
                                    value={chosenchart}
                                    onChange={(event,value)=>{
                                        if(value){
                                            setChosenChart(value)
                                        }else{
                                            setChosenChart('')
                                        }
                                    }}
                                    disabled = {disabled}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={chartTypes}
                                    sx={{ width: 300 }}
                                    renderOption={(props, option) => {
                                        return (
                                        <li {...props} key={option}>
                                            {option}
                                        </li>
                                        )
                                    }}
                                    renderInput={(params) => <TextField {...params} key={params} label="Chart Type" />}
                                    />
                            </div>
                                {/* CONCLUSION */}
                                <div className="w-full flex flex-col my-3">
                                    <label className={labelstyle} htmlFor=""> {`Conclusion of Result (Max 300 characters) :`}</label>
                                    <input disabled={disabled} required type="text" ref={concref} className={inputstyle + " w-full text-left overflow-ellipsis"} id="" placeholder="Conclusion of result" onChange={(e)=>{
                                        if((e.target.value).trim().length >= 301){
                                            failuretoast('max 300 characters reached')
                                        }else{
                                            setConclusion(e.target.value)}
                                        }
                                    } value={conclusion}/>
                                    
                                <span className="text-gray-400">{`${concref.current ? 300-(concref.current.value).trim().length : 300} character(s) left*`}</span>
                            </div>

                            <NormalBtn text= "Save Settings" action={DisableAutoComplete} addclass='mx-2'/>
                                <div>
                                {/* TABLE */}
                                <div className="table mt-4 mx-auto">
                                    <div className="entire_column">
                                        <div className="column_cell"></div>
                                        {charts[id].labels.map((column)=>{
                                            return <input key={uuidv4()} onBlur={(e)=>{
                                                if(CheckIfSettingSaved()){
                                                    let tempstr =  e.target.value
                                                    UpdateColumn(column, tempstr)
                                                }
                                            }} className="column_cell" placeholder={charts[id].labels[charts[id].labels.indexOf(column)]}/>
                                        })}
                                    </div>
                                    <div className="rows2">
                                        <div className="flex flex-col">
                                            {
                                                charts[id].comps.map((comp)=>{
                                                    return (
                                                        <input key={uuidv4()} className="row_cell" onBlur={(e)=>{
                                                            if(CheckIfSettingSaved()){
                                                                let tempstr =  e.target.value
                                                                UpdateRows(comp,tempstr)
                                                            }
                                                        }} placeholder={comp}/>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="flex flex-col">
                                            {
                                                charts[id].table.map((row)=>{
                                                    return <div key={uuidv4()} className="entire_row">
                                                        {row.map((item)=>{
                                                            return <input key={uuidv4()} className="row_input" onBlur={(e)=>{
                                                                if(CheckIfSettingSaved()){
                                                                    let tempstr = e.target.value
                                                                    if(NoDuplicate(tempstr,charts[id].table,item) == tempstr){
                                                                        UpdateCell(item, NoDuplicate(tempstr,table,item))
                                                                    }else{
                                                                        failuretoast('Value already exists in a cell')
                                                                        e.target.value = ''
                                                                    }
                                                                }
                                                            }} placeholder={charts[id].table[charts[id].table.indexOf(row)][row.indexOf(item)]}/>
                                                        })} 
                                                    </div> 
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                        </div>
                        <div className='flex flex-col w-1/2 p-3 h-full overflow-y-scroll justify-between'>
                            <p className="tbase black"> Preview :</p>
                            {/* THE CHARTs */}
                            {
                                (chosenchart == 'Bar Chart') ? 
                                <BarChart title={charts[id].title} subtitle = {charts[id].subtitle} display={true} edit={true} labels={charts[id].labels} comps={charts[id].comps} table={charts[id].table} />
                                : 
                                <LineChart title={charts[id].title} subtitle = {charts[id].subtitle} display={true} edit={true} labels={charts[id].labels} comps={charts[id].comps} table={charts[id].table} />
                            }
                        </div>
                    </div>
                    <div className='flex mx-auto mt-8 mb-16'>
                        <SaveBtn text= "Save Result" action={()=>{
                            setDate(`${getDate.getDay()}-${getDate.getMonth()+1}-${getDate.getFullYear()}`) ; 
                            setTime(formatAMPM(getDate))
                            // FUNCTION TO PUSH ALL DATA TO THE DATABASE

                        }} addclass='mx-2'/>
                        <CanDelBtn text="Cancel" action={()=>{
                            window.history.back();
                        }} addclass='mx-2'/>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
        
  )
}

export default page