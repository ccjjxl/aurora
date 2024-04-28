import UserLoginForm from "./Login";
import {Suspense} from "react";
const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Suspense>
      <UserLoginForm/>
      </Suspense>
    </div>
  );
};

export default LoginPage;