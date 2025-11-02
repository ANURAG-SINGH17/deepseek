export const maxDuration = 60;

import messageModel from "@/models/messageModel";
import { verifyToken } from "@/utils/verifyToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
   
    const { message , msgId} = await req.json();
    const user = await verifyToken();

    if(!user || !msgId){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if(!message){
        return NextResponse.json({ message: "please first give the prompt" }, { status: 400 });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "X-Title": "DeepSeek Clone",
        },
      }
    );

    const aiReply = response.data.choices?.[0]?.message?.content || "No reply";

   const updatedChat = await messageModel.findOneAndUpdate(
      {_id:msgId},
      {
        $setOnInsert: { name:"New Chat", userId: user.id },
        $push: {
          messages: {
            $each: [
              {
                role: "user",
                content: message,
                timestamp: Date.now(),
              },
              {
                role: "assistant",
                content: aiReply,
                timestamp: Date.now(),
              },
            ],
          },
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ reply: aiReply, chat: updatedChat } , {status:200});

  } catch (error) {
    console.error("AI Error:", error?.response?.data || error.message);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
