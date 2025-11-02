export const maxDuration = 60;

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import chatModel from "@/models/chatModel";
import messageModel from "@/models/messageModel";

export async function GET() {
  try {

    const user = await verifyToken();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const chat = await chatModel.create({
      chatName: "New chat",
      userId: user.id,
    });

    const messagesRes = await messageModel.create({
      userId:user.id,
      chatId:chat._id,
      messages:[]
    })

    const newchat =  await chatModel.findByIdAndUpdate(chat._id, { msgId: messagesRes._id }, { new: true });


    return NextResponse.json({message:"New chat created" , newchat}, { status: 200});

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
