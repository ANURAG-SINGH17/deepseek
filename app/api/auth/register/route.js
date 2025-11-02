import userModel from "@/models/user.Model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcryptPassword from "@/utils/bcryptPassword";
import validator from "validator"
import { connectDB } from "@/lib/config/db";


export async function POST(req){
    await connectDB();
    const {name , email , password} = await req.json();

    if(!name || !email || !password){
        return NextResponse.json({message: "All Fields are Required"}, {status: 400});
    }

    //  Check email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

    const isUserAlreadyExists = await userModel.findOne({email});

    if (isUserAlreadyExists){
        return NextResponse.json({message: "user already exist"}, {status: 400});
    }

    const hashedPassword = await bcryptPassword(password);

    const user = await userModel.create({
        name,
        email,
        password:hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    if (!token) {
        return NextResponse.json({message: "JWT missing/invalid"}, {status: 401});;
    }

    const res =  NextResponse.json({ message: "User registered successfully"},{status:200});

    res.cookies.set("token",token);

    return res

}  