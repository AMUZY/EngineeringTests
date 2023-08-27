import { signIn } from "next-auth/react"

export const loginUser = async ({email , password})=>{
    const res = await signIn("credentials" , {
        callbackUrl : "/user/dashboard/home",
        email,
        password
    })

    return res; 
}
