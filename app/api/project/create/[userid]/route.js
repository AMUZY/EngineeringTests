import Project from "@models/project";
import { connectToDB } from "@app/utils/database";
import { NextResponse } from "next/server";


export const POST = async (req, {params})=>{
    try {
        await connectToDB().then((info)=>{
            if(info.status === (500 || 301)){
                throw new Error("Redundant or disconnect")
            }
        }).catch((error)=>{throw new Error(error)})
        const userid = params.userid;
        const info = await req.json()
        
        await Project.create({
            userid : userid,
            title : info.title,
            desc : info.desc,
            date : info.date,
            time : info.time
        })

        return new NextResponse("Project created succesfully" , { status : 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse("Couldn't create project" , { status : 500 })
    }
}




