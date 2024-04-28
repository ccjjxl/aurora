import {signInSchema} from "@lib/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {ZodError} from "zod";
import {config} from "@config";
const queryUser = async (name: string) => {
  if (config.user.name !== name) {
    return null;
  }
  const user = {
    id: "1",
    name: config.user.name,
    pwd: config.user.pwd,
    image: "/assets/images/user_head.jpg",
  };

  return Promise.resolve(user);
};

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
        try {
          let user = null;

          const {name, password} = await signInSchema.parseAsync(credentials);

          user = await queryUser(name);

          if (!user) {
            throw new Error("User not found.");
          }
          if (user.pwd !== password) {
            throw new Error("Incorrect password.");
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
