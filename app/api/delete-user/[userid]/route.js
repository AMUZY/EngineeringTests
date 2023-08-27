import User from '@models/user';
import Project from '@models/project';
import { connectToDB } from "@app/utils/database";
import { NextResponse } from 'next/server';

export const DELETE = async(req, {params})=>{
    console.log(params.userid)
    try {
        await connectToDB().then((info)=>{
            if(info.status === (500 || 301)){
                throw new Error("Redundant or disconnect")
            }
        }).catch((error)=>{throw new Error(error)})

        await Project.deleteMany({
            userid : params.userid
        })

        await User.findByIdAndDelete(params.userid)

        return new NextResponse("Account Deleted" , { status : 200 })
    } catch (error) {
        return new NextResponse("Couldn't delete" , { status : 500 })
    }
}