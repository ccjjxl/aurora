import {queryPodcastEpisodes, deletePodcast} from "@lib/data/podcast";
import {NextRequest, NextResponse} from "next/server";

export const POST = async (request: NextRequest) => {
  const {podcastId} = await request.json();
  console.debug(`query podcast episodes ${podcastId}`);

  try {
    const episodes = await queryPodcastEpisodes(podcastId);
    return NextResponse.json(episodes);
  } catch (err) {
    console.error(err);
    return new Response("", {status: 500});
  }
};

export const DELETE = async (request: NextRequest) => {
  const {podcastId} = await request.json();
  console.debug(`delete podcast  ${podcastId}`);

  await deletePodcast(podcastId);
  return NextResponse.json({msg: "success"});
};
