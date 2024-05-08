"use client";
import {useState} from "react";
import type {Episodes} from "@types";
import {useQuery} from "@tanstack/react-query";
import {Loading} from "@components/ui/loading";
import {NothingFound} from "@components/shared/NothingFound";
import {Search} from "lucide-react";
import {Input} from "@components/ui/input";

import EpisodesList from "./episodesList";

import {useSearchParams} from "next/navigation";
import EpisodesPlayer from "./episodesPlayer";

interface EpisodesContainerProps {
  podcastInfo: {
    id: number;
    rssUrl: string;
    podcastName: string;
  };
}

export const EpisodesContainer = ({podcastInfo}: EpisodesContainerProps) => {
  const searchParam = useSearchParams();
  const episodeId = searchParam.get("episode") || "";
  const {data, isLoading, error} = useQuery({
    queryKey: [`podcast-${podcastInfo.id}`],
    queryFn: async () => {
      return await fectPodCast();
    },
  });

  const [episodes, setEpisodes] = useState<Episodes>();
  const [filter, setFilter] = useState<string>("");

  function changeListenedStatus(status: boolean) {
    if (!episodes) {
      return;
    }
    setEpisodes({...episodes, Listened: status});

    data?.map((episode) => {
      if (episode.id === episodes.id) {
        episode.Listened = status;
      }
    });
  }

  const fectPodCast = async () => {
    const res: Episodes[] = await fetch(`/api/podcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({podcastId: podcastInfo.id}),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });

    if (episodeId) {
      console.log(episodeId,"param");
      const episode = res.find((item) => item.id === Number(episodeId));
      console.log(episode,"find");
      if (episode) {
        setEpisodes(episode);
      }
    }

    return res;
  };

  if (isLoading) {
    return <Loading useDefaultLoadingText />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">Something went wrong</div>
    );
  }

  if (!data) {
    return <NothingFound />;
  }

  const handleClick = (episode: Episodes) => {
    setEpisodes(episode);
  };
  return (
    <div className="flex h-[calc(100vh-90px)]">
      <div className="max-w-[400px] min-w-[390px] w-full pr-2 ">
        <div className="bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search Episodes"
                className="pl-8"
              />
            </div>
          </form>
        </div>

        {filter ? (
          <EpisodesList
            episodes={data.filter((item) => item.title.includes(filter))}
            currentEpisode={episodes}
            handleClick={handleClick}
          />
        ) : (
          <EpisodesList episodes={data} currentEpisode={episodes} handleClick={handleClick} />
        )}
      </div>
      <div className="flex-grow p-2  h-[calc(100vh-90px)] max-h-[calc(100vh-90px)] border">
        {episodes && (
          <EpisodesPlayer
            podcastName={podcastInfo.podcastName}
            episodes={episodes}
            change={changeListenedStatus}
          />
        )}
      </div>
    </div>
  );
};
