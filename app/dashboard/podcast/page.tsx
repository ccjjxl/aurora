import PodcastList from "@components/podcast/podcastList";
import {fetchPodcastChannel} from "@lib/data/podcast";

import type {Podcast} from "@types";
import {Metadata} from "next";
import DashboardContainer from "@components/dashboard/container";

export const metadata: Metadata = {
  title: "Podcast",
};
const breadcrumbItems = [{title: "Podcast", link: "/dashboard/podcast"}];

export default async function PodcastPage() {
  const podcasts = (await fetchPodcastChannel()) as Podcast[];
  return (
    <DashboardContainer breadcrumb={breadcrumbItems} scroll={true}>
      <PodcastList podcasts={podcasts} />
    </DashboardContainer>
  );
}
