'use client'
import Image from "next/image";
import SideMenu from "./sidemenu";
import LogOut from "./logout";
import { useState } from "react";
import { cn } from "@lib/utils";

const Sidebar =  ({session}: {session: any}) => {

  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  
  return (
    <nav className={cn("flex flex-col justify-between  h-screen  ", sideMenuIsExpand ? "w-[200px]" : "w-[60px]")}>
      <div className="navbar relative">
        <div className={`flex items-center gap-5   border-b p-1`}>
          <Image
            className="rounded object-cover"
            src={"/assets/images/user_head.jpg"}
            alt=""
            width="40"
            height="40"
          />
          <div className={cn("flex flex-col", sideMenuIsExpand ? "" : "hidden")}>
            <span className="font-bold">{session.user?.name}</span>
            <span className="text-xs">Administrator</span>
          </div>
        </div>

        <SideMenu setExpand={setSideMenuIsExpand} />
      </div>

      {/* <LogOut /> */}
    </nav>
  );
};

export default Sidebar;
