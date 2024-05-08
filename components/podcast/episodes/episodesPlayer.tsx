import {Button} from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {Separator} from "@components/ui/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@components/ui/tooltip";
import {listeningStore} from "@lib/data/listening";
import type {Episodes} from "@types";
import dayjs from "dayjs";
import {Archive, ArchiveX, MoreVertical, Save} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";

const delay = 20;
type EpisodesDetailProps = {
  episodes: Episodes;
  change: (status: boolean) => void;
  podcastName: string;
};

const EpisodesPlayer = ({episodes, change, podcastName}: EpisodesDetailProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    const item = listeningStore.getListening(episodes.id as number);

    if (item && audioRef.current) {
      audioRef.current.currentTime = item.process;
    }
  }, [episodes]);

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

  const onTimeUpdate = () => {
    if (!audioRef.current) {
      return;
    }

    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;

    if (currentTime - lastTime < delay) {
      return;
    }
    listeningStore.saveOrUpdate({
      id: episodes.id as number,
      podcastId: episodes.podcastId as number,
      podcastName: podcastName,
      title: episodes.title,
      img: episodes.img,
      publishedAt: episodes.publishedAt,
      duration: duration,
      process: currentTime,
    });

    setLastTime(currentTime);
  };

  const onEnded = () => {
    console.log("ended");
    listeningStore.remove(episodes.id as number);
  };

  return (
    <div className="flex flex-col gap-3 justify-between">
      <div>
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
                <audio
                  ref={audioRef}
                  onTimeUpdate={onTimeUpdate}
                  onEnded={onEnded}
                  className="w-full"
                  src={episodes.audio}
                  autoPlay
                  controls
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />
      </div>
      <div className="h-[calc(100vh-90px)] max-h-[calc(100vh-90px)] overflow-y-auto">
        {/* <ScrollArea className="h-[400px]"> */}
        <div
          className="mt-2 p-2 pb-[400px]"
          dangerouslySetInnerHTML={{__html: episodes.description}}
        />
        {/* </ScrollArea> */}
      </div>
    </div>
  );
};

export default EpisodesPlayer;
