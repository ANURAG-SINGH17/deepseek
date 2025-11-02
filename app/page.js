"use client";
import React, { useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import DesktopMenu from "@/components/DesktopMenu";
import SideBar from "@/components/SideBar";
import InputBox from "@/components/InputBox";
import axios from "axios";

const Home = () => {
  const [expand, setExpand] = useState(false);
  const [chatMessages, setChatMessages] = useState();
  const [openMenuId, setOpenMenuId] = useState(false);
  const [chatList, setChatList] = useState();
  const [showChatAI, setChatAI] = useState(false);
  const [prompt, setPrompt] = useState();
  const [load, setLoad] = useState(false);
  const [data , setData] = useState({
    chatId:"",
    msgId:"",
    title:""
  });

  const sendPromptToAI = async (chatId , msgId) => {
    try {
      // console.log(prompt , chatId , msgId);
      const ai = await axios.post('api/ai',{msgId , message:prompt});
      if(ai.status === 200){
        setPrompt("")
        setLoad(false);
      const res = await axios.post("/api/chat/getchatmessage", { chatId });
      if (res.status === 200) {
        setPrompt("")
        setChatMessages(res.data.msg[0].messages);
        // console.log(res.data.msg[0].messages);
        setChatAI(true)
        setLoad(false)
        if (res.data.msg[0].messages.length === 0) {
          setChatAI(false);
          setLoad(false);
        }
      }
      }
      setPrompt("");
    } catch (err) {
      setPrompt("")
      console.log(err);
    }
  };

  const getChatList = async (chatId, msgId) => {
    try{
      const chatRes = await axios.get("/api/chat/getchatlist");
      if (!chatRes) {
          return console.log("something went worng");
        }
        if(chatRes.status === 200){
          setChatList(chatRes.data.chatList);
          sendPromptToAI(chatId,msgId);
        }

    }catch(err){
      console.log(err)
      setPrompt("")
    }
  }

  const createNewChat = async () => {
    try {
      setLoad(true)
      const res = await axios.get("api/chat/create");
      if (res.status === 200) {
        getChatList(res.data.newchat._id , res.data.newchat.msgId);
      }

    } catch (err) {
      console.log(err);
      setLoad(false)
      setPrompt("")
    }
  };

  return (
    <div>
      <div className="h-[100vh] w-full bg-[#151517] text-white flex overflow-hidden">
        {/* Top Menu mobile*/}
        <MobileMenu setExpand={setExpand} />
        {/* Top Menu pc*/}
        <DesktopMenu setExpand={setExpand} />
        {/* Side bar */}
        <SideBar
          chatMessages={chatMessages}
          setChatAI={setChatAI}
          expand={expand}
          setExpand={setExpand}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          setChatMessages={setChatMessages}
          chatList={chatList}
          setChatList={setChatList}
          setData={setData}
        />
        {/* Main chat */}
        <div className="h-[100vh] w-full">
          {/* Input Box */}
          <InputBox
          prompt={prompt}
          setPrompt={setPrompt}
          createNewChat={createNewChat}
            showChatAI={showChatAI}
            setOpenMenuId={setOpenMenuId}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            load={load}
            setLoad={setLoad}
            data={data} 
            setData={setData}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
