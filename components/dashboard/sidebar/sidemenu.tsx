"use client";
import {MdDashboard, MdRssFeed} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import React from "react";
import {cn} from "@lib/utils";

const menuItems = [
  {
    title: "dashboard",
    list: [
      {
        title: "Import",
        path: "/dashboard",
        icon: <MdDashboard className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: "podcast",
    list: [
      {
        title: "Subscription",
        path: "/dashboard/podcast",
        icon: <MdRssFeed className="mr-2 h-4 w-4" />,
      },
    ],
  },
];

interface SideMenuProps {
  setExpand: (isExpand: boolean) => void;
}

const SideMenu = ({setExpand}: SideMenuProps) => {
  const [isExpand, setIsExpand] = React.useState(true);

  return (
    <>
      <div className="space-y-4 py-4">
        <div className="">
          {menuItems.map((cat) => (
            <>
              <h2
                className={cn(
                  "mb-2 px-4 text-lg font-semibold tracking-tight",
                  isExpand ? "" : "hidden",
                )}
              >
                {cat.title}
              </h2>

              <div className={cn("space-y-1 ", isExpand ? "ml-4" : "")}>
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} isExpand={isExpand} />
                ))}
              </div>
            </>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
        className="absolute z-50 top-20 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${isExpand ? "rotate-0" : "rotate-180"} transform duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
};

export default SideMenu;
