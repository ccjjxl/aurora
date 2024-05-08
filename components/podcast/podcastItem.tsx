import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@components/ui/context-menu";
import {Aperture, Delete, Star} from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";
import type {Podcast} from "@types";
import {useRouter} from "next/navigation";
import {favoriteStore} from "@lib/data/favorite";
import React, {useEffect} from "react";

const PodcastItem = ({podcast}: {podcast: Podcast}) => {
  const router = useRouter();

  const [favorite, setFavorite] = React.useState<boolean>(false);

  useEffect(() => {
    const res = favoriteStore.isFavorite(podcast.id);

    setFavorite(res);
  }, []);

  const deletePodcast = async () => {
    fetch(`/api/podcast`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({podcastId: podcast.id}),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
        toast.success("Delete Successful");
        router.refresh();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Delete Failure");
      });
  };

  const favoritePodcast = async () => {
    if (favorite) {
      favoriteStore.remove(podcast.id);
      setFavorite(false);
      toast.success("UnFavorite Successful");
    } else {
      const success = favoriteStore.saveOrUpdate(podcast);
      if (!success) {
        toast.error("Already favorite");
      } else {
        toast.success("Favorite Successful");
        setFavorite(true);
      }
    }
  };
  return (
    <div key={podcast.id} className="flex flex-col hover:translate-y-2 border rounded p-2 ">
      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={`/dashboard/podcast/${podcast.id}`}>
            <div className="relative">
              <img width={250} height={200} className="rounded p" src={podcast.image} alt="" />
              <div className="flex justify-center">{podcast.name}</div>
              {favorite && (
                <div className="absolute top-2 right-2">
                  <Star color="yellow" />
                </div>
              )}
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-[200px]">
          <ContextMenuItem onClick={deletePodcast} className="text-red-500">
            <Delete className="w-4 h-4 mr-2" />
            Delete <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem onClick={favoritePodcast}>
            <Star className="w-4 h-4 mr-2" />
            {favorite ? "UnFavorite" : "Favorite"}
          </ContextMenuItem>

          <ContextMenuItem disabled>
            <Aperture className="w-4 h-4 mr-2" />
            WebSite
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default PodcastItem;
