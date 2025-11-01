"use client";
import React from "react";
import InputOpeningContent from "./InputOpeningContent";
import ChatWithAI from "./ChatWithAI";

const InputBox = ({
  setOpenMenuId,
  chatMessages,
  showChatAI,
  prompt,
  setPrompt,
  createNewChat,
  load,
  setLoad,
  setData,
  data,
  setChatMessages

}) => {
  return (
    <div
      onClick={() => {
        setOpenMenuId(null);
      }}
      className={`flex justify-center items-center flex-col h-full w-full ${
        showChatAI ? "gap-1" : "gap-8"
      }`}
    >
      {showChatAI ? (
        <ChatWithAI chatMessages={chatMessages} 
        data={data}
        load={load} 
            setData={setData} 
            setChatMessages={setChatMessages}
            setLoad={setLoad}
            />
            
      ) : (
        <InputOpeningContent  
          prompt={prompt}
          setPrompt={setPrompt}
          createNewChat={createNewChat}
          load={load}
          setLoad={setLoad}
          />
      )}
    </div>
  );
};

export default InputBox;
