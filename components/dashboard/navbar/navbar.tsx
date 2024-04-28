import {MdNotifications, MdOutlineChat, MdPublic} from "react-icons/md";
import Image from "next/image";
import {Search} from "lucide-react";
import {Input} from "@components/ui/input";
import Link from "next/link";

import {cn} from "@/lib/utils";

import {auth, signOut} from "@auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex justify-between items-center px-4">
        {/* <div className="hidden lg:block">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
        </div> */}

        <div className="hidden lg:block">
          <div className={`flex items-center gap-5   `}>
            <Image
              className="rounded object-cover"
              src={"/assets/images/user_head.jpg"}
              alt=""
              width="40"
              height="40"
            />
            <div className="flex flex-col">
              <span className="font-bold">{session?.user?.name}</span>
              <span className="text-xs">Administrator</span>
            </div>
          </div>
        </div>

        <div className={cn("block lg:!hidden")}>
          <div>mobile</div>
        </div>

        <div className="flex items-center gap-5">
          <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8 bl" />
              </div>
            </form>
          </div>
          <div className="flex gap-5">
            <MdOutlineChat size={20} />
            <MdNotifications size={20} />
            <MdPublic size={20} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
