"use client";
import {Rss, PlusCircle, RotateCw} from "lucide-react";
import {Input} from "@components/ui/input";
import React from "react";
import {Button} from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {Label} from "@components/ui/label";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {rssImport} from "./rssImport";

export type PodcastSearchProps = {
  onSearch: (value: string) => void;
};
const PodcastSearch = ({onSearch}: PodcastSearchProps) => {
  const router = useRouter();

  const [url, setUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleImport = async () => {
    if (!url) {
      toast.error("Please enter rss url");
      return;
    }

    setLoading(true);

    rssImport({
      rss: url,
      success: (data) => {
        toast.success("Imported podcast");

        router.refresh();
        //router.push(`/dashboard/podcast`);
      },
      error: (err) => {
        console.error(err);
        toast.error("Import Failed");
      },
      finally: () => {
        setLoading(false);
        setOpen(false);
      },
    });
  };
  return (
    <div>
      <div className=" flex flex-row items-center justify-between">
        <div className="flex-1 mr-1 relative">
          <Rss className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search podcast"
            className="pl-8 focus:!ring-transparent"
          />
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="relative">
                {" "}
                <PlusCircle className="mr-2 h-4 w-4" />
                Add podcast
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Podcast</DialogTitle>
                <DialogDescription>
                  Copy and paste the podcast feed URL to import.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="url">Podcast URL</Label>
                  <Input
                    onChange={(e) => setUrl(e.target.value)}
                    id="url"
                    placeholder="https://example.com/feed.xml"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={loading} onClick={handleImport}>
                  {loading ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Import Podcast"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PodcastSearch;
