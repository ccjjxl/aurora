"use server";
import {signOut} from "@auth";
import {MdLogout} from "react-icons/md";

const LogOut = () => {
  return (
    <div className="fixed top-2 right-2  ">
      <form
        action={async () => {
          "use server";
          await signOut({redirectTo: "/login"});
        }}
      >
        <button className="p-2 bg-slate-200/50 hover:bg-slate-400/50 rounded transition-colors duration-300">
          <MdLogout size={16} />
        </button>
      </form>
    </div>
  );
};

export default LogOut;
