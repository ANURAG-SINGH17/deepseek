'use client'
import React from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";

const InputBox = ({setOpenMenu}) => {
  return (
    <div onClick={()=>{setOpenMenu(false)}} className=" flex justify-center items-center gap-8 flex-col h-full w-full">
      {/* Icon and Text */}
      <div className="flex gap-2">
        <Image
          className="w-10 h-10 cursor-pointer"
          src={assets.logo_icon}
          alt="logo"
        />
        <h1 className="text-3xl">How can I help you?</h1>
      </div>
      {/* Input field */}
      <div className="w-[60vw] bg-[#2c2c2e] rounded-4xl border border-[1px] border-zinc-700 min-h-[17vh]">
        <input
          className="w-full bg-transparent outline-none p-5 text-sm rounded-4xl"
          type="text"
          placeholder="Type your message here..."
        />
        {/* Bottom icons and send button */}
        <div className="w-full flex justify-between px-5 py-1">
          <div className="flex gap-2">
            <button className="border-zinc-600 border-[1px] flex px-3 py-1 rounded-full justify-center items-center hover:border-zinc-400">
              <Image
                className="w-5 h-5"
                src={assets.deepthink_icon}
                alt="regenerate-icon"
              />
              <span className="ml-1 text-xs">DeepThink</span>
            </button>
            <button className="border-zinc-600 border-[1px] flex px-3 py-1 rounded-full justify-center items-center hover:border-zinc-400">
              <Image
                className="w-4 h-4"
                src={assets.search_icon}
                alt="regenerate-icon"
              />
              <span className="ml-1 text-sm font-[300]">search</span>
            </button>
          </div>
          <div className="flex gap-2">
            <button>
              <Image
                className="w-4 h-4"
                src={assets.pin_icon}
                alt="send-icon"
              />
            </button>
            <button className="bg-[#3c5081] h-8 w-8 flex justify-center items-center rounded-full">
              <Image
                className="w-4 h-4"
                src={assets.arrow_icon}
                alt="send-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
