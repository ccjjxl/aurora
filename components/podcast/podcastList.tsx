"use client";
import type {Podcast} from "@types";

import PodcastSearch from "./podcastSearch";
import {useState} from "react";
import PodcastItem from "./podcastItem";

interface PodcastListProps {
  podcasts: Podcast[];
}

const PodcastList = ({podcasts}: PodcastListProps) => {
  const [filter, setFilter] = useState<string>("");

  function getPodcasts() {
    if (filter) {
      return podcasts.filter((item) => item.name.includes(filter));
    }

    return podcasts;
  }

  return (
    <>
      <PodcastSearch onSearch={setFilter} />
      <div className="grid grid-cols-5 gap-2 mt-3">
        {getPodcasts().map((item) => (
          <PodcastItem key={item.id} podcast={item} />
        ))}
      </div>
    </>
  );
};

export default PodcastList;
