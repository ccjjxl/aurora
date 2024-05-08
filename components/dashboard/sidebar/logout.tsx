"use server";
import {signOut, auth} from "@auth";
import {Avatar, AvatarFallback, AvatarImage} from "@components/ui/avatar";
import {Button} from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {Github, LogOut} from "lucide-react";
const UserNav = async () => {
  const session = await auth();

  return (
    <div className="fixed top-2 right-4 z-30">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/assets/images/user_head.jpg"
                alt={session?.user.name || "podcast"}
              />
              <AvatarFallback>{session?.user.name}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">admin@google.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className="">
              <a
                className="hover:underline hover:text-sky-500"
                href="https://github.com/ccjjxl/aurora"
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>

              <DropdownMenuShortcut>
                <Github size={20} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <form
              className="flex w-full"
              action={async () => {
                "use server";
                await signOut({redirectTo: "/login"});
              }}
            >
              <button className="flex flex-1" type="submit">
                Log out
              </button>
            </form>
            <DropdownMenuShortcut>
              <LogOut size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNav;
