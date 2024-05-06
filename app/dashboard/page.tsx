import {auth} from "@auth";

import React from "react";
import ImportPodcast from "@components/podcast/importPodcast";
import DashboardContainer from "@components/dashboard/container";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <DashboardContainer>
      <ImportPodcast />
    </DashboardContainer>
  );
}
