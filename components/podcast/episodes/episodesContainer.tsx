"use client";
import {useState} from "react";
import type {Episodes} from "@types";
import {useQuery} from "@tanstack/react-query";
import {Loading} from "@components/ui/loading";
import {NothingFound} from "@components/shared/NothingFound";
import dayjs from "dayjs";
import {ScrollArea} from "@components/ui/scroll-area";
import {Archive, ArchiveX, MoreVertical, Search, Save} from "lucide-react";
import {Input} from "@components/ui/input";

import {Separator} from "@components/ui/separator";
import EpisodesList from "./episodesList";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@components/ui/tooltip";
import {Button} from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import {toast} from "sonner";


interface EpisodesContainerProps {
  podcastInfo: {
    id:number;
    rssUrl: string;
  };
}

export const EpisodesContainer = ({podcastInfo}: EpisodesContainerProps) => {
  const {data, isLoading,error} = useQuery({
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
      }else{
        return Promise.reject(res);
      }
    });

    return res;
  };

  if (isLoading) {
    return <Loading useDefaultLoadingText />;
  }

  if (error) {
    return <div className="flex justify-center items-center text-red-500">Something went wrong</div>;
  }

  if (!data) {
    return <NothingFound />;
  }

  const handleClick = (episode: Episodes) => {
    setEpisodes(episode);
  };
  return (
    <div className="flex">
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
      <div className="flex-grow p-2  border">
        {episodes && <EpisodesDetail episodes={episodes} change={changeListenedStatus} />}
      </div>
    </div>
  );
};

type EpisodesDetailProps = {
  episodes: Episodes;
  change: (status: boolean) => void;
};

const EpisodesDetail = ({episodes, change}: EpisodesDetailProps) => {
  const changeListenedStatus = async () => {
    fetch(`/api/podcast/episodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: episodes.id, listened: !episodes.Listened}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "success") {
          toast.success("Update Successful");
          change(!episodes.Listened);
        }
      })
      .catch((err) => {
        toast.error("Update Failure");
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col gap-3 ">
      <TooltipProvider>
        <div className="flex items-center p">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                {episodes.Listened ? (
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                    <span className="sr-only">Listened</span>
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon">
                    <ArchiveX className="h-4 w-4" /> <span className="sr-only">UnListened</span>
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent>{episodes.Listened ? "Listened" : "UnListened"}</TooltipContent>
            </Tooltip>

          </div>

          <div className="ml-auto flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toast.success("This feature is not yet implemented");
                  }}
                >


                  <Save className="h-4 w-4" />
                  <span className="sr-only">Save</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-2 h-6" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={changeListenedStatus}>
                {episodes.Listened ? "Mark UnListened" : "Mark Listened"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
      <Separator />

      <div className="p-2">
        <div className="flex  items-start ">
          <img
            className="h-[150px] w-[150px] rounded"
            src={episodes.img ? episodes.img : "/assets/images/podcast/cover.jpg"}
            alt=""
          />
          <div className="flex flex-col gap-3 p-2   w-full">
            <div className="flex justify-between">
              <h3 className="ml-2">{episodes.title}</h3>
              <p className="text-gray-400 text-xs">
                publish date：{dayjs(episodes.publishedAt).format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="m-2">
              <audio className="w-full" src={episodes.audio} autoPlay controls />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <ScrollArea className="h-[400px]">
        <div
          className="mt-2 p-2  max-h-[350px]"
          dangerouslySetInnerHTML={{__html: episodes.description}}
        />
      </ScrollArea>
    </div>
  );
};
