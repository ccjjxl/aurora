"use client";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@components/ui/input";
import {Button} from "@components/ui/button";
import {Separator} from "@components/ui/separator";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
//import {signIn} from "@auth";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import {signInSchema} from "@lib/zod";

const profileFormSchema = signInSchema;

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserLoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  console.log(callbackUrl, "ccc");
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
   await signIn("credentials", {
      name: data.name,
      password: data.password,
      callbackUrl: callbackUrl ?? "/dashboard",
    });
  };

  return (
    <div className="w-[400px] p-5 border rounded">
      <div>
        <h1 className="text-3xl">Login</h1>
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="admin" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {error && (
              <p className="text-red-500">Login failed, please reconfirm login information</p>
            )}
          </div>
          <Button type="submit">login</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserLoginForm;
