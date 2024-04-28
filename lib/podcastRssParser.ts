"use server";

import Parser from "rss-parser";
import type {PodcastInfo, EpisodesInfo} from "@types";

export async function getLastedPodcastRss(rssUrl: string) {
  const parser = new Parser();

  const response = await fetch(rssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    },
  });

  const data = await response.text();

  const feed = await parser.parseString(data);

  let image = feed.itunes?.image;

  if (!image) {
    image = feed.image?.url;
  }

  if (!image) {
    image = "/assets/images/podcast/cover.jpg";
  }

  const episodes: EpisodesInfo[] = [];
  const podcastInfo: PodcastInfo = {
    name: feed.title as string,
    desc: feed.description as string,
    webSite: feed.link as string,
    image: image as string,
    rssUrl: rssUrl,
    episodes,
  };

  feed.items.forEach((item) => {
    let desc = item.content;
    if (!desc) {
      desc = item["description"];
    }
    if (!desc) {
      desc = item["contentSnippet"];
    }
    episodes.push({
      title: item.title as string,
      audio: item.enclosure?.url as string,
      publishedAt: item.pubDate as string,
      img: item["itunes"]?.image as string,
      duration: item["itunes"]?.duration as string,
      description: desc as string,
    });
  });

  podcastInfo["episodes"] = episodes;

  return podcastInfo as PodcastInfo;
}
