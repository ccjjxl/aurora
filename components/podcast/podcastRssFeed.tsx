"use client";
import type {Podcast} from "@types";
import Link from "next/link";
import PodcastSearch from "./podcastSearch";
import {useState} from "react";

interface PodcastRssFeedsProps {
  podcastRssFeeds: Podcast[];
}

const PodcastRssFeeds = ({podcastRssFeeds}: PodcastRssFeedsProps) => {
  const [filter, setFilter] = useState<string>("");
  return (
    <>
      <PodcastSearch onSearch={setFilter} />
      {filter ? (
        <PodcastRssFeedsContainer
          podcastRssFeeds={podcastRssFeeds.filter((item) => item.name.includes(filter))}
        />
      ) : (
        <PodcastRssFeedsContainer podcastRssFeeds={podcastRssFeeds} />
      )}
    </>
  );
};

const PodcastRssFeedsContainer = ({podcastRssFeeds}: PodcastRssFeedsProps) => {
  return (
    <div className="grid grid-cols-5 gap-2 mt-3">
      {podcastRssFeeds.map((item) => (
        <div key={item.id} className="flex flex-col hover:translate-y-2 border rounded p-2 ">
          <Link href={`/dashboard/podcast/${item.id}`}>
            <img width={250} height={200} className="rounded p" src={item.image} alt="" />
            <div className="flex justify-center">{item.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PodcastRssFeeds;
