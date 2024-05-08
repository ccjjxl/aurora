import type {Metadata} from "next";
import {auth, signOut} from "@auth";

import Sidebar from "@components/dashboard/sidebar/sidebar";
import {ReactQueryProviderForDashboard} from "@app/providers/react-query-provider";
import {Toaster} from "@components/ui/sonner";
import UserNav from "@components/dashboard/sidebar/logout";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar session={session} />
        <UserNav />

        <ReactQueryProviderForDashboard>
          <main className="w-full border-l">{children}</main>
        </ReactQueryProviderForDashboard>
      </div>

      <Toaster position="top-right" />
    </>
  );
}
