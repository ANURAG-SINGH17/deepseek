import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "@/models/user.Model";


export async function POST(req){

    const { email, password } = await req.json();

    if(!email || !password){
        return NextResponse.json({message: "All Fields are Required"}, {status: 400});
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // check password
    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if (!isPasswordMatch) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // create JWT
    const token = jwt.sign(
        {id:user._id, email:user.email},
        process.env.JWT_KEY,
        {expiresIn:"1d"}
    )

    //send token as cookie
    const res = NextResponse.json({message: "Login successful", user});
    res.cookies.set("token" , token);

    return res

}