"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "@/app/assets/assets";
import axios from "axios";
import Loader from "./Loader";

const SideBar = ({
  expand,
  setExpand,
  openMenuId,
  setOpenMenuId,
  setChatMessages,
  setChatAI,
  chatList,
  setChatList,
  setData
}) => {
  const [userData, setUserData] = useState();
  const [newName, setNewName] = useState("");
  const [inputId, setInputId] = useState(null);
  const [loadingCir, setLoadingCir] = useState(false);

  const chatMessage = async (chatId) => {
    try {
      setChatMessages(false);
      const res = await axios.post("/api/chat/getchatmessage", { chatId });
      if (res.status === 200) {
        setChatMessages(res.data.msg[0].messages);
        if (res.data.msg[0].messages.length === 0) {
          setChatAI(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchdata = async () => {
    try {
      setLoadingCir(true);
      const [chatRes, userRes] = await Promise.all([
        axios.get("/api/chat/getchatlist"),
        axios.get("/api/auth/getuser"),
      ]);

      if (!chatRes || !userRes) {
        setLoadingCir(false);
        return console.log("something went worng");
      }
      setChatList(chatRes.data.chatList);
      setUserData(userRes.data.userData);
      setLoadingCir(false);
    } catch (err) {
      console.log(err);
      setLoadingCir(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const renameChat = async (chatId) => {
    try {
      const res = await axios.post("/api/chat/rename", {
        chatId,
        name: newName,
      });
      setData(prev => ({
                          ...prev,
                          title:newName,
                        }))
      fetchdata();

      if (res.status === 200) {
        setNewName(" ");
        setInputId(null);
        setOpenMenuId(null);
        // console.log("updated chatname");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      setLoadingCir(true);

      const res = await axios.post("/api/chat/delete", { chatId });
      if (res.status === 200) {
        fetchdata();
        setChatAI(false)
        setOpenMenuId(null);
        setLoadingCir(false);
        fetchdata();
      } else {
        setLoadingCir(false);
      }
    } catch {
      console.log(err);
      setLoadingCir(false);
    }
  };

  return (
    <div
      className={`h-screen z-10 overflow-y-hidden border-r-[1px] border-zinc-800 bg-[#1b1b1c] 
          transition-all duration-300 ease-in-out
          ${expand ?"absolute w-[70vw] md:static  md:w-72  opacity-100" : "w-0 opacity-0"}`}
    >
      {/* top of side bar*/}
      <div className="w-full flex justify-between items-center py-3.5 px-2">
        <div className="logo flex items-center gap-1">
          <Image
            className="w-9 h-9 cursor-pointer"
            src={assets.logo_icon}
            alt="logo"
          />
          <Image
            className="w-30 h-5 object-cover"
            src={assets.logo_text}
            alt="logo-text"
          />
        </div>
        <div className="close-icon">
          <button
            className="cursor-pointer"
            onClick={() => {
              setExpand(false);
            }}
          >
            <Image
              className="w-6 h-6"
              src={assets.sidebar_close_icon}
              alt="close-icon"
            />
          </button>
        </div>
      </div>
      {/* New-Chat-Button */}
      <div className="py-1 px-2">
        <button
          onClick={() => {
            setChatAI(false);
          }}
          className="cursor-pointer flex items-center justify-center gap-1.5 w-full bg-[#43454a] text-sm hover:bg-[#525357] py-2.5 px-3 rounded-full"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 0.599609C3.91309 0.599609 0.599609 3.91309 0.599609 8C0.599609 9.13376 0.855461 10.2098 1.3125 11.1719L1.5918 11.7588L2.76562 11.2012L2.48633 10.6143C2.11034 9.82278 1.90039 8.93675 1.90039 8C1.90039 4.63106 4.63106 1.90039 8 1.90039C11.3689 1.90039 14.0996 4.63106 14.0996 8C14.0996 11.3689 11.3689 14.0996 8 14.0996C7.31041 14.0996 6.80528 14.0514 6.35742 13.9277C5.91623 13.8059 5.49768 13.6021 4.99707 13.2529C4.26492 12.7422 3.21611 12.5616 2.35156 13.1074L2.33789 13.1162L2.32422 13.126L1.58789 13.6436L2.01953 14.9297L3.0459 14.207C3.36351 14.0065 3.83838 14.0294 4.25293 14.3184C4.84547 14.7317 5.39743 15.011 6.01172 15.1807C6.61947 15.3485 7.25549 15.4004 8 15.4004C12.0869 15.4004 15.4004 12.0869 15.4004 8C15.4004 3.91309 12.0869 0.599609 8 0.599609ZM7.34473 4.93945V7.34961H4.93945V8.65039H7.34473V11.0605H8.64551V8.65039H11.0605V7.34961H8.64551V4.93945H7.34473Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          New Chat
        </button>
      </div>

      <div className="ml-4 mt-3 pb-1 text-zinc-600">Recent</div>

      {/* side-bar-content chat list*/}
      <div className="h-[70vh] w-full pt-2 overflow-y-auto px-2 ">
        {/* chat label */}

        {loadingCir ? (
          <Loader />
        ) : chatList ? (
          chatList.map((item, idx) => {
            const formattedDate = new Date(item.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            );

            const isOpen = openMenuId === item._id;
            const isOpenInput = inputId === item._id;

            return (
              <>
                <div key={item._id} className="relative mb-2">
                  <span className="text-xs text-zinc-700 ml-3">
                    {formattedDate}
                  </span>
                  {isOpenInput ? (
                    <input
                      onKeyDown={(e) => {
                        if (e.key === "Enter") renameChat(item._id);
                      }}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full outline-0 border-[1px] z-20text-sm px-3 cursor-pointer h-10 rounded-xl border-blue-600"
                      type="text"
                    />
                  ) : (
                    <div
                      onClick={() => {
                        chatMessage(item._id);
                        setChatAI(true);
                        setData(prev => ({
                          ...prev,
                          chatId:item._id,
                          msgId:item.msgId,
                          title:item.chatName,
                        }))
                        
                      }}
                      className={`group w-full flex justify-between z-20 items-center text-sm px-3 hover:bg-zinc-700 cursor-pointer h-10 rounded-xl ${
                        isOpen ? "bg-zinc-700" : ""
                      }
                    
                    `}
                    >
                      <span>{item.chatName}</span>
                      <Image
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(isOpen ? null : item._id);
                        }}
                        className="w-4 invisible group-hover:visible"
                        src={assets.three_dots}
                        alt="icons"
                      />
                    </div>
                  )}
                </div>
                <div key={idx}
                  className={`absolute z-90 left-[15vw] bg-zinc-800 rounded-lg overflow-hidden px-1 py-1 transition-all duration-200 ease-in-out
            ${isOpen ? "opacity-100 w-28 py-2" : "opacity-0 w-0 py-0 hidden"}
            `}
                >
                  <span
                    onClick={() => {
                      setInputId(isOpenInput ? null : item._id);
                    }}
                    className="text-sm text-blue-500 cursor-pointer flex gap-2 px-3 py-1 hover:bg-zinc-900 rounded-lg"
                  >
                    <Image
                      className="w-3"
                      src={assets.pencil_icon}
                      alt="icon"
                    />
                    Rename
                  </span>
                  <span
                    onClick={() => {
                      deleteChat(item._id);
                    }}
                    className="text-sm text-red-500 cursor-pointer flex gap-2 px-3 py-1 hover:bg-zinc-900 rounded-lg mt-1"
                  >
                    <Image
                      className="w-3"
                      src={assets.delete_icon}
                      alt="icon"
                    />
                    Delete
                  </span>
                </div>
              </>
            );
          })
        ) : (
          "no list yet"
        )}
      </div>

      {/* bottom profile */}
      <div className=" cursor-pointer w-full px-3 flex gap-1 items-center pt-3">
        <Image
          className="w-7 h-7 rounded-full cursor-pointer"
          src={assets.profile_icon}
          alt="user-profile"
        />
        <span className=" text-sm font-medium text-[#b3b3b9]">
          {userData ? userData.name : "sign in"}
        </span>
      </div>
    </div>
  );
};

export default SideBar;
