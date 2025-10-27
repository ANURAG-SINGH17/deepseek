'use client'
import Image from 'next/image'
import React from 'react'
import { assets } from "@/app/assets/assets";

const SideBar = ({expand , setExpand ,openMenu , setOpenMenu }) => {


  return (
    <div
          className={`relative h-full z-10  border-r-[1px] border-zinc-800 bg-[#1b1b1c] 
          transition-all duration-300 ease-in-out
          ${expand ? "w-72 opacity-100" : "w-0 opacity-0"}`}
        >
          {/* top of side bar*/}
          <div className="w-full flex justify-between items-center py-3.5 px-2">
            <div className="logo flex items-center gap-1">
              <Image
              className="w-9 h-9 cursor-pointer"
              src={assets.logo_icon}
              alt="logo"
            />
            <Image className="w-30 h-5 object-cover" src={assets.logo_text} alt='logo-text'/>
            </div>
            <div className="close-icon">
              <button className="cursor-pointer" onClick={()=>{setExpand(false)}}>
                <Image
                    className="w-6 h-6"
                    src={assets.sidebar_close_icon}
                    alt="close-icon"
                  />
              </button>
            </div>
          </div>
          {/* New-Chat-Button */}
          <div className='py-1 px-2'>
            <button className='cursor-pointer flex items-center justify-center gap-1.5 w-full bg-[#43454a] text-sm hover:bg-[#525357] py-2.5 px-3 rounded-full'>
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

          <div className='ml-4 mt-3 pb-1 text-zinc-600'>Recent</div>

          {/* side-bar-content chat list*/}
          <div className='h-[70vh] w-full pt-2 overflow-y-auto px-2'>
            {/* chat label */}
            <div className={`group w-full flex justify-between items-center text-sm px-3 hover:bg-zinc-700 cursor-pointer h-10 rounded-xl ${openMenu ? 'bg-zinc-700' : ''}`}>
              <span>new chat</span>
              <Image onClick={()=>{setOpenMenu(!openMenu)}} className='w-4 invisible group-hover:visible' src={assets.three_dots} alt='icons'/>
            </div>
            {/* chat label menu */}
            {
              openMenu && (
                <div className='absolute -right-[4vw] mt-1 py-2 px-1 w-26 h-auto rounded-lg bg-zinc-700'>
              <span className='text-sm text-zinc-400 cursor-pointer flex gap-2 bg-zinc-800 py-1 px-2 rounded-lg'>
                <Image className='w-3' src={assets.pencil_icon} alt='icon'/>
                Rename
              </span>
              <span className='text-sm text-red-500 mt-2  cursor-pointer flex gap-2 bg-zinc-800 py-1 px-2 rounded-lg'>
                <Image className='w-3' src={assets.delete_icon} alt='icon'/>
                Delete
              </span>
            </div>
              )
            }
          </div>

          {/* bottom profile */}
          <div className=' cursor-pointer w-full px-3 flex gap-1 items-center pt-3'>
            <Image
              className="w-7 h-7 rounded-full cursor-pointer"
              src={assets.profile_icon}
              alt="user-profile"
            />
            <span className=' text-sm font-medium text-[#b3b3b9]'>
              sign in
            </span>
          </div>
        </div>
  )
}

export default SideBar
