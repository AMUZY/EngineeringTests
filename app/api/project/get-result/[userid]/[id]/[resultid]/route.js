import Project from "@models/project";
import { connectToDB } from "@app/utils/database";
import { NextResponse } from "next/server";


export const GET = async (req , {params})=>{
    try {
        await connectToDB().then((info)=>{
            if(info.status === (500 || 301)){
                throw new Error("Redundant or disconnect")
            }
        }).catch((error)=>{throw new Error(error)})
    
        const id = params.id
        const project = await Project.findById(id)
        let foundResult = {}
        project.results.forEach((result) => {
            if(params.resultid === result.id){
                foundResult = result
            }
        });
        
        return new NextResponse(JSON.stringify({
            project : project,
            result : foundResult
        }), { status : 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse("Couldn't fetch project" , { status : 500 })
    }
}
