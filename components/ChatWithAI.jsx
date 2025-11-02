import React, { useEffect, useRef, useState } from "react";
import InputForm from "./InputForm";
import Loader from "./Loader";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import Markdown from "react-markdown";
import prism from "prismjs";
import axios from "axios";

const ChatWithAI = ({
  chatMessages,
  setData,
  data,
  load,
  setChatMessages,
  setLoad,
}) => {
  const [prompt, setPrompt] = useState();
  const chatRef = useRef();

useEffect(() => {
  const el = chatRef.current;
  if (!el) return;

  setTimeout(() => {
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, 0);
}, [chatMessages]);


  const sendPrmptToAi = async () => {
    try {
      setLoad(true);
      addUserMSg();
      const ai = await axios.post("api/ai", {
        msgId: data.msgId,
        message: prompt,
      });
      if (ai.status === 200) {
         addAiMsg(ai.data.reply);
        setPrompt("");
        setLoad(false);
      }
      setLoad(false);
      setPrompt("");
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  const addUserMSg = () => {
    setChatMessages((prev) => [...prev, { role: "user", content: prompt }]);
  };

  const addAiMsg = (reply) => {
    setChatMessages((prev) => [...prev , {role:"assistant" , content:reply}])
  }

  useEffect(
    () => {
      prism.highlightAll();
    },
    [chatMessages]
  );

  return (
    <>
      <div className="w-full bg-[#151517] py-2 text-center">{data.title}</div>
      <div className="h-full lg:w-[65vw]  md:w-[90vw] sm:w-[100vw] w-[100vw] overflow-hidden px-3">
        <div>
          <div ref={chatRef} className="myscroll h-[74vh] w-full overflow-y-auto mb-2 scroll-smooth">
            {/* Chat messages will be rendered here */}
            {chatMessages ? (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "assistant" ? "justify-start" : "justify-end "
                  } mb-2`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      msg.role === "assistant"
                        ? "flex gap-2 md:text-sm text-xs p-3 rounded-lg md:max-w-[93%] max-w-[100%]"
                        : "bg-[#1d1d2c] md:text-sm text-xs p-3 rounded-lg md:max-w-[80%] max-w-[100%]"
                    }`}
                  >
                    {" "}
                    {msg.role === "assistant" ? (
                      <div className="w-7 h-7 flex-shrink-0">
                        <Image
                          width={29}
                          height={29}
                          src={assets.logo_icon}
                          alt="logo"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="w-full">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
          <InputForm
            setPrompt={setPrompt}
            prompt={prompt}
            load={load}
            sendPrmptToAi={sendPrmptToAi}
          />
        </div>
      </div>
    </>
  );
};

export default ChatWithAI;

