"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@components/ui/tooltip";

interface MenuLinkProps {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
  };
  isExpand: boolean;
}
const MenuLink = ({item, isExpand}: MenuLinkProps) => {
  const pathname = usePathname();

  return (
    <Link href={item.path}>
      {isExpand ? (
        <Button
          variant={`${pathname === item.path ? "secondary" : "ghost"}`}
          className="w-full justify-start"
        >
          {item.icon}
          {item.title}
        </Button>
      ) : (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={`${pathname === item.path ? "secondary" : "ghost"}`}
                  className="flex items-center justify-center"
                >
                  {item.icon}
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </Link>
  );
};

export default MenuLink;
