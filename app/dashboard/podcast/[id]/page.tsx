import {EpisodesContainer} from "@components/podcast/episodes/episodesContainer";
import BreadCrumb from "@components/shared/breadcrumb";
import {getPodcastRssFeed} from "@lib/service/podcast";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Podcast",
};

interface FeedProps {
  params: {id: string};
}

const PodcastRssFeedPage = async ({params}: FeedProps) => {
  const id = parseInt(params.id);
  const podcastInfo = await getPodcastRssFeed(id);
  if (!podcastInfo) {
    return <div>Podcast not found</div>;
  }

  const breadcrumbItems = [
    {title: "Podcast", link: "/dashboard/podcast"},
    {title: podcastInfo.name, link: "/dashboard/podcast"},
  ];
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 flex flex-col">
      <BreadCrumb items={breadcrumbItems} />

      <EpisodesContainer key={podcastInfo.id} podcastInfo={podcastInfo} />
    </div>
  );
};

export default PodcastRssFeedPage;
