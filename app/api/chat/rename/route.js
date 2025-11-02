import chatModel from "@/models/chatModel";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(req){

    try{
    const {chatId , name} = await req.json();

    const user = await verifyToken();

    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!chatId || !name) {
        return NextResponse.json({ message: "oops please enter info , try again" }, { status: 401 });
    }
    const updatedchat = await chatModel.findByIdAndUpdate(
  chatId,
  { chatName: name },
  { new: true }
);


    return NextResponse.json({updatedchat} , {status:200})

    }catch(err){
        console.log(err)
        return NextResponse.json({ success:false, error: err})
    }


}