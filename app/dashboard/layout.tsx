import type {Metadata} from "next";

import Sidebar from "@components/dashboard/sidebar/sidebar";
import {ReactQueryProviderForDashboard} from "@app/providers/react-query-provider";
import {Toaster} from "@components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
};

export default function DashboardLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <ReactQueryProviderForDashboard>
          <main className="w-full border-l">{children}</main>
        </ReactQueryProviderForDashboard>
      </div>

      <Toaster position="top-right" />
    </>
  );
}
