import {auth} from "@auth";

import React from "react";
import ImportPodcast from "@components/podcast/importPodcast";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (

    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 flex  flex-col gap-5">
      <ImportPodcast />
    </div>

  );
}
