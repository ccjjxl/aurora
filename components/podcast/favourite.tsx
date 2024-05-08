"use client";
import {favoriteStore} from "@lib/data/favorite";
import {Podcast} from "@types";
import {Rss} from "lucide-react";
import Link from "next/link";
import React, {useEffect} from "react";



const Item = (props: Podcast) => {
  return (
    <div className="flex flex-col border shadow rounded p-2 hover:-translate-y-2">
      <Link className="ml-1 hover:underline" href={`/dashboard/podcast/${props.id}`}>
        <div>
          <img className="rounded" width={150} src={props.image || "/assets/images/podcast/cover.jpg"} alt="" />
        </div>
        <div className="flex items-center justify-center">
          <p className="flex  text-sm items-center">
            <Rss width={15} height={15} />

            {props.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

const FavouritePodcast = () => {
  const [items, setItems] = React.useState<Podcast[]>([]);

  useEffect(() => {
    setItems(favoriteStore.get());
  }, []);
  return (
    <div>
      <h1 className="text-3xl">Favourite</h1>
      <div className="grid md:grid-cols-5 lg:grid-cols-8 gap-2  mt-2">
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default FavouritePodcast;
