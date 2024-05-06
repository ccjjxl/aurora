import DashboardContainer from "@components/dashboard/container";
import {EpisodesContainer} from "@components/podcast/episodes/episodesContainer";
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
    <DashboardContainer breadcrumb={breadcrumbItems} className="flex flex-col">
      <EpisodesContainer key={podcastInfo.id} podcastInfo={podcastInfo} />
    </DashboardContainer>
  );
};

export default PodcastRssFeedPage;
