import mongoose from "mongoose";
import { NextResponse } from "next/server";

let isConnected = false; //track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return new NextResponse("failed" , { status : 301 })
  }
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "EngineeringTests",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connection.readyState === 1) {
      isConnected = true;
      console.log("MongoDB connected");
      return new NextResponse("connected" , { status : 200 })
    }

  } catch (error) {
    console.log(error);
    return new NextResponse("failed" , { status : 500 })
  }
};
