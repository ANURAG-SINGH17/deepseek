import chatModel from "@/models/chatModel";
import messageModel from "@/models/messageModel";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(req){

    try{
        
    const {chatId , msgId , name} = await req.json();

    const user = await verifyToken();

    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!chatId || !msgId || !name) {
        return NextResponse.json({ message: "oops please enter info , try again" }, { status: 401 });
    }
    const updatedchat =  await chatModel.findByIdAndUpdate({_id:chatId} , {chatName:name});
    const updatedMsg = await messageModel.findByIdAndUpdate({_id:msgId} , {name});

    return NextResponse.json({updatedchat,updatedMsg})

    }catch(err){
        console.log(err)
        return NextResponse.json({ success:false, error: err})
    }


}