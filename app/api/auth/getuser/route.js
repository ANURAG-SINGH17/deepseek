
import { connectDB } from "@/lib/config/db";
import userModel from "@/models/user.Model";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        const user = await verifyToken();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userData = await userModel.findById(user.id).select('-password');


        return NextResponse.json({userData},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({ success:false, error: err})
    }
}