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
      name:'New chat',
      userId:user.id,
      chatId:chat._id,
      messages:[]
    })

    return NextResponse.json({ chat , messagesRes}, { status: 201 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
