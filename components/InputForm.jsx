import React from 'react'
import Image from "next/image";
import { assets } from "@/app/assets/assets";

const InputForm = ({prompt , setPrompt , load , sendPrmptToAi}) => {
  return (
    <div className="lg:w-[63vw] md:w-[80vw] w-[96vw] bg-[#2c2c2e] rounded-4xl border-[1px] border-zinc-700 lg:min-h-[15vh] min-h-[5vh] md:min-h-[10vh] pb-2">
            <input
            onChange={(e)=>{setPrompt(e.target.value)}}
            value={prompt}
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
                <button  onClick={()=>{sendPrmptToAi();}}
                            disabled={!prompt || prompt.trim() === ""}
                             className={`${
                    !prompt || prompt.trim() === ""
                      ? "bg-[#344268] cursor-not-allowed"
                      : "bg-[#3e548a] cursor-pointer"
                  }bg-[#3c5081] h-8 w-8 flex justify-center items-center rounded-full`}>
                              {
                                load ? <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <Image 
                                className="w-4 h-4 cursor-pointer"
                                src={ !prompt || prompt.trim() === "" ? assets.arrow_icon_dull : assets.arrow_icon}
                                alt="send-icon"
                              />
                              }
                            </button>
              </div>
            </div>
    </div>
  )
}

export default InputForm
