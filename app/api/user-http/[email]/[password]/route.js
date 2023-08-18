import { compare } from 'bcrypt'
import { connectToDB } from "@app/utils/database";
import User from '@models/user';
import { NextResponse } from 'next/server';


export const GET = async (req, {params})=>{
    try {
        await connectToDB().catch(()=> {throw new Error(error)}) 
        
        const LogUser = {
            email : params.email,
            password : params.password
        }

        const UserExists = await User.findOne({
            email : LogUser.email
        })

        if(!UserExists){
            return new NextResponse("Wrong Email or Password")
        }

        const result = await compare(LogUser.password , UserExists.password).catch((error)=>{
            throw new Error(error)
        })

        if(result){
            return new NextResponse("Logged In Successfully" , { status : 200 })
        }else{
            return new NextResponse("Password Mismatch" , { status : 404 })
        }

    } catch (error) {
        return new NextResponse("Wrong Email or Password" , { status : 500 })
    }
}


