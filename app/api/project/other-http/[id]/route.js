import Project from "@models/project";
import { connectToDB } from "@app/utils/database";
import { NextResponse } from "next/server";

export const PUT = async(req, {params})=>{
    try {
        await connectToDB().catch((error)=> {throw new Error(error)})

        const info = await req.json()

        await Project.findByIdAndUpdate(
            params.id,
            info,
            {
                new : true
            }
        )

        return new NextResponse("Project updated" , { status : 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Couldn't update project" , { status : 500 })
    }
}

export const GET = async (req , {params})=>{
    try {
        await connectToDB().catch((error)=>{throw new Error(error)})
    
        const id = params.id
        const project = await Project.findById(id)

        return new NextResponse(JSON.stringify(project), { status : 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse("Couldn't fetch data" , { status : 500 })
    }
}

export const DELETE = async(req, {params})=>{
    try {
        await connectToDB().catch((error)=>{throw new Error(error)})
        const id = params.id
        await Project.findByIdAndDelete(id)

        return new NextResponse("Project deletion success" , { status : 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse("Failed to delete project" , { status : 500 })
    }
}