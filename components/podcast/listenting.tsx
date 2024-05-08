"use client";
import {Progress} from "@components/ui/progress";
import {Play, Rss} from "lucide-react";
import Link from "next/link";
import React, {useEffect} from "react";

import type {ListentingEpisodes} from "@types";
import dayjs from "dayjs";
import {listeningStore} from "@lib/data/listening";
import {motion} from "framer-motion";
const Item = (props: ListentingEpisodes) => {
  function time() {
    const left = props.duration - props.process;
    return Math.floor(left / 60);
  }
  return (
    <div className="flex border shadow rounded p-2 hover:-translate-y-2 hover:bg-blue-100/20  ">
      <motion.div animate={{opacity: 1}} initial={{opacity: 0}}>
        <div className="relative">
          <img
            className="object-cover h-[100px] w-[100px] rounded"
            src={props.img || "/assets/images/podcast/cover.jpg"}
            alt=""
          />

          <Play
            size={40}
            strokeWidth={2}
            className=" text-sky-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>
      <div className="ml-2 flex flex-col gap-1">
        <div className="text-sm flex flex-row items-center">
          <p className="">
            {dayjs(props.publishedAt).format("YYYY-MM-DD")} <span className="text-xs text-red-500">{time()} min</span>
          </p>
          <Progress
            className="ml-1 w-[50px] h-2"
            max={100}
            value={(props.process / props.duration) * 100}
          />
        </div>
        <h3 className="text-sm max-w-[180px]">
          <Link
            className="ml-1 hover:underline"
            href={`/dashboard/podcast/${props.podcastId}?episode=${props.id}`}
          >
            {props.title}
          </Link>
        </h3>
        <p className="flex  text-sm items-center">
          <Rss width={15} height={15} />
          <Link className="ml-1 hover:underline" href={`/dashboard/podcast/${props.podcastId}`}>
            {props.podcastName}
          </Link>
        </p>
      </div>
    </div>
  );
};
const ListentingEpisodes = () => {
  const [items, setItems] = React.useState<ListentingEpisodes[]>([]);
  useEffect(() => {
    setItems(listeningStore.get());
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Listening</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ListentingEpisodes;
