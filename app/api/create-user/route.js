import { hash } from "bcrypt"
import { connectToDB } from "@app/utils/database";
import { NextResponse } from "next/server";
import User from "@models/user";

const saltRounds = 10;

const handler = async (req , res )=>{
    await connectToDB().then((info)=>{
        if(info.status === (500 || 301)){
            throw new Error("Redundant or disconnect")
        }
    }).catch((error)=>{throw new Error(error)})

    // CODE FOR A POST METHOD
    if(req.method === "POST"){
        if(!req.body){
            return new NextResponse("Bad request" , { status : 400 })
        }
        const newUser = await req.json()

        const UserExists = await User.findOne({
            email : newUser.email
        })

        if(UserExists){
            return new NextResponse("User Already Exists" , { status : 409 })
        }else {
            if(newUser.password.length < 3){
                return new NextResponse("Password should be three characters long" , { status : 409 })
            }

            const hashedPassword = await hash(newUser.password , saltRounds )

            User.create({
                email : newUser.email,
                username : newUser.username.replace(" ",""),
                password : hashedPassword,
                SigninType : "password"
            })

            return new NextResponse("Account Created Successfully" , { status : 201 })
        }

    }else{
        return new NextResponse("Method Not Allowed" , { status : 405 })
    }
}

export { handler as POST , handler as GET }

