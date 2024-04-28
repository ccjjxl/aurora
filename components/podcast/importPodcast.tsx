"use client";
import {RotateCw, Rss} from "@node_modules/lucide-react";
import {Input} from "@components/ui/input";
import {Button} from "@components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {rssImport} from "./rssImport";
export default function ImportPodcast() {
  const router = useRouter();

  const [url, setUrl] = React.useState<string>("");
  const [loding, setLoding] = React.useState<boolean>(false);

  const handleImport = async () => {
    if (!url) {
      return;
    }
    setLoding(true);
    rssImport({
      rss: url,
      success: (data) => {
        toast.success("Imported podcast");
        router.push(`/dashboard/podcast/${data.podcastId}`);
      },
      error: (err) => {
        console.error(err);
        toast.error("Import Failed");
      },
      finally: () => {
        setLoding(false);
      },
    });
  };

  return (
    <div className="flex  items-center justify-center mt-10">
      <div className="flex-1 mr-1 relative">
        <Rss className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Import podcast"
          className="pl-8 focus:!ring-transparent"
        />
      </div>

      <Button disabled={loding} size="sm" className="relative" onClick={handleImport}>
        {loding ? (
          <>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Import podcast"
        )}
      </Button>
    </div>
  );
}
