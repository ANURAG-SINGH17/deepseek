import chatModel from "@/models/chatModel";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function GET(){
    try{

        const user = await verifyToken();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = user.id

        const chatList = await chatModel.find({userId});

        if (!chatList) {
            return NextResponse.json({ message: "chat list empty" }, { status: 401 });
        }

        return NextResponse.json({chatList},{status:201})
    }catch(err){
        console.log(err)
        return NextResponse.json({ success:false, error: err})
    }
}