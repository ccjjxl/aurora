"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@components/ui/button";

const MenuLink = ({item}: any) => {
  const pathname = usePathname();

  return (
    <Link href={item.path}>
      <Button
        variant={`${pathname === item.path ? "secondary" : "ghost"}`}
        className="w-full justify-start"
      >
        {item.icon}
        {item.title}
      </Button>
    </Link>
  );
};

export default MenuLink;
