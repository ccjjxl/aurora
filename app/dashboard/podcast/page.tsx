import PodcastRssFeeds from "@components/podcast/podcastRssFeed";
import {fetchPodcastChannel} from "@lib/data/podcast";

import type {Podcast} from "@types";
import {Metadata} from "next";

import BreadCrumb from "@components/shared/breadcrumb";
import {ScrollArea} from "@components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Podcast",
};
const breadcrumbItems = [{title: "Podcast", link: "/dashboard/podcast"}];

export default async function PodcastPage() {
  const podcasts = (await fetchPodcastChannel()) as Podcast[];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <PodcastRssFeeds podcastRssFeeds={podcasts} />
      </div>
    </ScrollArea>
  );
}
