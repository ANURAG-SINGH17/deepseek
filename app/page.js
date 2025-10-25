"use client";
import React, { useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import DesktopMenu from "@/components/DesktopMenu";
import SideBar from "@/components/SideBar";
import InputBox from "@/components/InputBox";

const Home = () => {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenu , setOpenMenu] = useState(false);

  return (
    <div>
      <div className="h-screen w-full bg-[#151517] text-white flex overflow-hidden">
        {/* Top Menu mobile*/}
        <MobileMenu setExpand={setExpand}/>
        {/* Top Menu pc*/}
        <DesktopMenu setExpand={setExpand}/>
        {/* Side bar */}
        <SideBar expand={expand} setExpand={setExpand} openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        {/* Main chat */}
        <div className="h-full w-full">
          {/* Input Box */}
          <InputBox setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </div>
  );
};

export default Home;
