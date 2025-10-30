import chatModel from "@/models/chatModel";
import messageModel from "@/models/messageModel";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {chatId, msgId} = await req.json();

        const user = await verifyToken();

        if (!chatId || !msgId) {
            return NextResponse.json({ message: "invalid chat or msgId" }, { status: 401 });
        }

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const reschat = await chatModel.findByIdAndDelete(chatId);
        const resmsg = await messageModel.findByIdAndDelete(msgId);

        return NextResponse.json({reschat,resmsg})

    }catch(err){
        console.log(err)
        return NextResponse.json({ success:false, error: err})
    }
}