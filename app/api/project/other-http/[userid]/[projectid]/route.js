import Project from "@models/project";
import { connectToDB } from "@app/utils/database";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid'

const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
}


export const PUT = async(req, {params})=>{
    try {
        await connectToDB().then((info)=>{
            if(info.status === (500 || 301)){
                throw new Error("Redundant or disconnect")
            }
        }).catch((error)=>{throw new Error(error)})

        const info = await req.json()
        // EDIT PROJECT INFO
        if(info.editproject === true){
            const foundProject = await Project.findById(params.projectid)
            const newProject = {
                _id : foundProject._id,
                userid : params.userid,
                title : info.title,
                desc : info.desc,
                date : info.date,
                time : info.time,
                results : (foundProject.results ? foundProject.results : [])
            }
            await Project.findByIdAndUpdate(
                params.projectid,
                newProject,
                {
                    new : true
                }
            )
        }
        // EDIT RESULT WITH IT'S ID
        else if(info.id && !info.delete){
            const foundProject = await Project.findById(params.projectid)
            let resultArray = foundProject.results
            for(let i = 0; i < resultArray.length ; i++){
                if(resultArray[i].id === info.id){
                    resultArray[i] = info
                }
            }
            
            const newProject = {...foundProject , results : resultArray}
            await Project.findByIdAndUpdate(
                params.projectid,
                newProject,
                {
                    new : true
                }
            )
        }
        // DELETE RESULT
        else if(info.delete === true){
            const foundProject = await Project.findById(params.projectid)
            let resultArray = foundProject.results
            for(let i = 0; i < resultArray.length ; i++){
                if(resultArray[i].id === info.id){
                    resultArray.pop(resultArray[i])
                }
            }
            
            const newProject = {...foundProject , results : resultArray}
            await Project.findByIdAndUpdate(
                params.projectid,
                newProject,
                {
                    new : true
                }
            )
        }
        // CREATE RESULT
        else{
            const newinfo = {...info , id : uuidv4()}
    
            const foundProject = await Project.findById(params.projectid)
            let resultArray = foundProject.results
            resultArray.push(newinfo)
            const newProject = {...foundProject, results : resultArray}
            await Project.findByIdAndUpdate(
                params.projectid,
                newProject,
                {
                    new : true
                }
            )
        }

        return new NextResponse("Project updated" , { status : 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Couldn't update project" , { status : 500 })
    }
}

export const GET = async (req , {params})=>{
    if(params.userid && params.projectid == "undefined"){
        try {
            await connectToDB().then((info)=>{
                if(info.status === (500 || 301)){
                    throw new Error("Redundant or disconnect")
                }
            }).catch((error)=>{throw new Error(error)})

            const userid = params.userid

            const AllProjects = await Project.find({
                userid : userid
            })
    
            return new NextResponse(JSON.stringify(AllProjects), { status : 200 })
    
        } catch (error) {
            console.log(error)
            return new NextResponse("Couldn't fetch All Projects" , { status : 500 })
        }
    }else {
        try {
            await connectToDB().then((info)=>{
                if(info.status === (500 || 301)){
                    throw new Error("Redundant or disconnect")
                }
            }).catch((error)=>{throw new Error(error)})
        
            const id = params.projectid
            const project = await Project.findById(id)
            
            return new NextResponse(JSON.stringify(project), { status : 200 })
    
        } catch (error) {
            console.log(error)
            return new NextResponse("Couldn't fetch project" , { status : 500 })
        }
    }
}


export const DELETE = async(req, {params})=>{
    try {
        await connectToDB().then((info)=>{
            if(info.status === (500 || 301)){
                throw new Error("Redundant or disconnect")
            }
        }).catch((error)=>{throw new Error(error)})

        const id = params.projectid
        await Project.findByIdAndDelete(id)

        return new NextResponse("Project deletion success" , { status : 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse("Failed to delete project" , { status : 500 })
    }
}