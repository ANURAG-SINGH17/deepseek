export const maxDuration = 60;

import messageModel from "@/models/messageModel";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function POST(req){
    
    try{

        const {chatId} = await req.json();

        if (!chatId) {
            return NextResponse.json({ message: "please first send the chatId" }, { status: 401 });
        }

        const user = await verifyToken();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = user.id

        const msg = await messageModel.find({chatId})

        return NextResponse.json({msg},{status:200})

    }catch(err){
        console.log(err)
        return NextResponse.json({ success:false, error: err} ,{status:400})
    }
}