import { compare, hash } from "bcrypt";
import { connectToDB } from "@app/utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";

const saltRounds = 10;

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
      .then((info) => {
        if (info.status === (500 || 301)) {
          throw new Error("Redundant or disconnect");
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    const LogUser = {
      email: params.email,
      password: params.password,
    };

    const UserExists = await User.findOne({
      email: LogUser.email,
    });

    if (!UserExists) {
      throw new Error ("Wrong Email or Password");
    }

    const result = await compare(LogUser.password, UserExists.password).catch(
      (error) => {
        throw new Error(error);
      }
    );

    if (result) {
      return new NextResponse("Logged In Successfully", { status : 200 });
    } else {
      throw new Error("Password Mismatch");
    }
  } catch (error) {
      if(error.message === "Wrong Email or Password"){
        return new NextResponse(error , { status : 500})
      }else if(error.message === "Password Mismatch"){
        return new NextResponse(error , { status : 403})
      }else{
        return new NextResponse(error , { status : 500})
      }
    }
};

export const PUT = async (req, { params }) => {
  try {
    await connectToDB()
      .then((info) => {
        if (info.status === (500 || 301)) {
          throw new Error("Redundant or disconnect");
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    const info = await req.json();
    const hashed = await hash(info.password, saltRounds);

    const user = await User.findOne({
      email: params.email,
    });
    const tempuser = {
      _id: user._id,
      email: user.email,
      username: user.username,
      SigninType: user.SigninType,
      password: hashed,
      __v: user.__v,
    };
    await User.findOneAndReplace(
      {
        email: params.email,
      },
      tempuser
    );

    return new NextResponse("Password change successful", { status: 200 });
  } catch (error) {
    return new NextResponse("password update failed", { status: 500 });
  }
};
