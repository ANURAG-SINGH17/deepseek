import chatModel from "@/models/chatModel";
import messageModel from "@/models/messageModel";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {chatId} = await req.json();

        const user = await verifyToken();

        if (!chatId) {
            return NextResponse.json({ message: "invalid chat or msgId" }, { status: 401 });
        }

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Delete all messages of this chat
    const deletedMessages = await messageModel.deleteMany({ chatId });

    // Delete chat doc
    const deletedChat = await chatModel.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return NextResponse.json(
        { success: false, message: "Chat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Chat and messages deleted successfully",
      deletedChat,
      deletedMessages,
    } ,{status:200});

    }catch(err){
        console.log(err)
        return NextResponse.json({ success:false, error: err})
    }
}