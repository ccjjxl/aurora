import {queryPodcastEpisodes} from "@lib/data/podcast";
import {NextRequest} from "next/server";

export const POST = async (request: NextRequest) => {
  const {podcastId} = await request.json();
  console.debug(`query podcast episodes ${podcastId}`);

  try {
    const episodes = await queryPodcastEpisodes(podcastId);
    return new Response(JSON.stringify(episodes), {status: 200});
  } catch (err) {
    console.error(err);
    return new Response("", {status: 500});
  }
};
