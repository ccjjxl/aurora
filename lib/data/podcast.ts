import {db} from "@lib/db/db";
import {getLastedPodcastRss} from "@lib/podcastRssParser";
import {findPodcast, getEpisodes, saveOrUpdateEpisodes} from "@lib/service/podcast";

export async function fetchPodcastChannel() {
  return db.podcast.findMany({});
}

export async function deletePodcast(podcastId: number) {
  const [e, p] = await db.$transaction([
    db.podcast.delete({where: {id: podcastId}}),
    db.episodes.deleteMany({where: {podcastId: podcastId}}),
  ]);
  return true;
}

export async function queryPodcastEpisodes(podcastId: number) {
  const podcast = await findPodcast(podcastId);
  if (!podcast) {
    return [];
  }

  //need sync
  if (isAfterLastUpdate(podcast.lastUpdate, 2)) {
    console.log(`podcast ${podcast.name} need sync beyond 2 hours`);
    const lastedInfo = await getLastedPodcastRss(podcast.rssUrl);

    await saveOrUpdateEpisodes(lastedInfo.episodes, podcast.id);
  }

  return getEpisodes(podcast.id);
}

const isAfterLastUpdate = (lastUpdate: Date | null, hours: number): boolean => {
  if (!lastUpdate) {
    return true;
  }
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - lastUpdate.getTime();

  if (timeDifference < 0) {
    return false;
  }

  const timeDifferenceInHours = Math.abs(timeDifference) / 1000 / 60 / 60;
  return timeDifferenceInHours > hours;
};
