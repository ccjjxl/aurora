import {ScrollArea} from "@components/ui/scroll-area";
import {cn} from "@lib/utils";
import type {Episodes} from "@types";
import dayjs from "dayjs";

export type EpisodesListProps = {
  episodes: Episodes[];
  currentEpisode?: Episodes;
  handleClick: (episode: Episodes) => void;
};

const EpisodesList = ({episodes, currentEpisode, handleClick}: EpisodesListProps) => {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2  pt-2">
        {episodes.map((item) => (
          <button
            key={item.title}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              currentEpisode?.title === item.title && "bg-muted",
            )}
            onClick={() => handleClick(item)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title.substring(0, 18)}</div>

                  {!item.Listened && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    currentEpisode?.title === item.title
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {dayjs(item.publishedAt).format("YYYY-MM-DD")}
                </div>
              </div>
              <div className="text-xs font-medium">{item.duration}</div>
            </div>

            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description?.substring(0, 40)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default EpisodesList;
