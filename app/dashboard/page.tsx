import {auth} from "@auth";

import React from "react";
import ImportPodcast from "@components/podcast/importPodcast";
import DashboardContainer from "@components/dashboard/container";
import LastedEpisodes from "@components/podcast/lasted";
import ListentingEpisodes from "@components/podcast/listenting";
import FavouritePodcast from "@components/podcast/favourite";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <DashboardContainer scroll={true}>
      <ImportPodcast />
      <LastedEpisodes />
      <ListentingEpisodes />
      <FavouritePodcast />
    </DashboardContainer>
  );
}
