import {queryLastedEpisodes} from "@lib/data/podcast";
import dayjs from "dayjs";
import {Rss} from "lucide-react";
import Link from "next/link";
import React from "react";

interface ItemProps {
  img: string;
  title: string;
  podcastId: number;
  publishedAt: Date;
  episodeId: number;
}

const Item = ({img, title, podcastId, publishedAt, episodeId}: ItemProps) => {
  return (
    <div className="flex border shadow rounded p-2 hover:-translate-y-2 hover:bg-blue-100/20">
      <div className="relative ">
        <img className="rounded object-cover h-[100px] w-[100px]" src={img || "/assets/images/podcast/cover.jpg"} alt="" />
      </div>
      <div className="ml-2 flex flex-col gap-2">
        <h3 className="text-sm max-w-[180px]">
          <Link
            className="ml-1 hover:underline"
            href={`/dashboard/podcast/${podcastId}?episode=${episodeId}`}
          >
            {title}
          </Link>
        </h3>
        <p className="flex  text-sm items-center">
          <Link className="ml-1 hover:underline" href={`/dashboard/podcast/${podcastId}`}>
            <Rss width={15} height={15} />
          </Link>
        </p>

        <div className="text-sm text-red-600/50">
          <p>{dayjs(publishedAt).format("YYYY-MM-DD")}</p>
        </div>
      </div>
    </div>
  );
};

const LastedEpisodes = async () => {
  const items = await queryLastedEpisodes(10);

  return (
    <div>
      <h1 className="text-3xl">Latest</h1>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-2  mt-2">
        {items.map((item) => (
          <Item
            key={item.id}
            episodeId={item.id}
            img={item.img as string}
            title={item.title}
            podcastId={item.podcastId}
            publishedAt={item.publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default LastedEpisodes;
