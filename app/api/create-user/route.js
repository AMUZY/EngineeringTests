import { hash } from "bcrypt"
import { connectToDB } from "@app/utils/database";
import { NextResponse } from "next/server";
import User from "@models/user";

const saltRounds = 10;

const handler = async (req , res )=>{
    try {
        await connectToDB().then((info)=>{
            if(info.status === (500 || 301)){
                throw new Error("Redundant or disconnect")
            }
        }).catch((error)=>{throw new Error(error)})
    
        // CODE FOR A POST METHOD
        if(req.method === "POST"){
            if(!req.body){
                throw new Error("Bad request")
            }
            const newUser = await req.json()
    
            const UserExists = await User.findOne({
                email : newUser.email
            })
    
            if(UserExists){
                throw new Error("User Already Exists")
            }else {
                if(newUser.password.length < 3){
                    throw new Error("Password should be three characters long")
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
            throw new Error("Method Not Allowed")
        }
        
    } catch (error) {
        if(error.message === "Bad request"){
            return new NextResponse(error , { status : 400 })
        }else if(error.message === "User Already Exists" || error === "Password should be three characters long"){
            return new NextResponse(error , { status : 409 })
        }else if(error.message === "Method Not Allowed"){
            return new NextResponse(error , { status : 405 })
        }
    }
}

export { handler as POST }

