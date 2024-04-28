import MenuLink from "./menuLink/menuLink";
import {MdDashboard, MdLogout, MdRssFeed} from "react-icons/md";
import {auth, signOut} from "@auth";
import {Button} from "@components/ui/button";
import Image from "next/image";

const menuItems = [
  {
    title: "dashboard",
    list: [
      {
        title: "Overview",
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

const Sidebar = async () => {
  const session = await auth();

  return (
    <nav className="flex flex-col justify-between  h-screen min-w-[200px] ">
      <div className="navbar">

        <div className={`flex items-center gap-5   border-b p-1`}>
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

        <div className="space-y-4 py-4">
          <div className="">
            {menuItems.map((cat) => (
              <>
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{cat.title}</h2>

                <div className="space-y-1 ml-4">
                  {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="logout space-y-4   ">
        <div className="">
          <div className="space-y-1">
            <form
              action={async () => {
                "use server";
                await signOut({redirectTo: "/login"});
              }}
            >
              <Button variant="secondary" className="w-full justify-start">
                <MdLogout className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
