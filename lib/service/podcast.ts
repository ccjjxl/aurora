"use server";
import type {Episodes, Podcast, PodcastInfo, EpisodesInfo} from "@types";
import {db} from "@lib/db/db";
import dayjs from "dayjs";
import {getLastedPodcastRss} from "@lib/podcastRssParser";

export async function feedRssAdd(rssUrl: string, re: boolean = false) {
  //const urlReg =/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

  const urlReg = /^(https?:\/\/)/;
  if (!rssUrl) {
    return {
      message: "rssUrl is required",
    };
  }

  if (!urlReg.test(rssUrl)) {
    return {
      message: "rssUrl is invalid",
    };
  }

  const id = await FeedPodcastRss(rssUrl);
  return {
    message: "ok",
    podcastId: id,
  };
}

export async function getPodcastRssFeed(id: number) {
  return db.podcast.findFirst({where: {id: id}});
}

export async function findPodcast(id: number) {
  return db.podcast.findFirst({where: {id: id}});
}

export async function saveChannelInfo(podcastInfo: PodcastInfo) {
  const result = await db.podcast.create({
    data: {
      name: podcastInfo.name ,
      desc: podcastInfo.desc,
      image: podcastInfo.image,
      rssUrl: podcastInfo.rssUrl,
      webSite: podcastInfo.webSite,
    },
  });
  return result.id;
}

export async function getEpisodes(podcastId: number) {
  return db.episodes.findMany({
    where: {
      podcastId: podcastId,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function saveOrUpdateEpisodes(episodes: Episodes[], podcastId: number) {
  const allListened = await db.episodes.findMany({
    where: {
      podcastId: podcastId,
      Listened: true,
    },
  });

  const cache = Object.fromEntries(allListened.map((e) => [e.title, true]));

  await db.episodes.deleteMany({where: {podcastId: podcastId}});

  let titleMap: Record<string, number> = {};

  let data = episodes.map((episode) => {
    if (titleMap[episode.title]) {
      titleMap[episode.title] += 1;
    } else {
      titleMap[episode.title] = 1;
    }

    return {
      podcastId: podcastId,
      title: episode.title.trim(),
      audio: episode.audio,
      publishedAt: str2Date(episode.publishedAt),
      img: episode.img,
      duration: episode.duration,
      description: episode.description,
      Listened: cache[episode.title],
    };
  });

  //console.info(titleMap,"titleMap");

  for (const title in titleMap) {
    if (titleMap[title] > 1) {
      console.info(title, "is duplicated");
      throw new Error("duplicated title");
    }
  }

  const createResult = await db.episodes.createMany({
    data: data,
    // skipDuplicates: true, //is not supported when using MongoDB, SQLServer, or SQLite.
  });

  await updatePodcastLastUpdate(podcastId);
}

export async function updatePodcastLastUpdate(podcastId: number) {
  return db.podcast.update({
    where: {
      id: podcastId,
    },
    data: {
      lastUpdate: new Date(),
    },
  });
}

function str2Date(time: string) {
  if (!time) return new Date();
  const date = dayjs(time);
  if (date.isValid()) return date.toDate();

  return new Date();
}

export async function FeedPodcastRss(rssUrl: string): Promise<number> {
  const podcast = await db.podcast.findFirst({
    where: {
      rssUrl: rssUrl,
    },
  });

  if (podcast) {
    return podcast.id;
  }

  const info = await getLastedPodcastRss(rssUrl);

  return await saveChannelInfo(info);
}
