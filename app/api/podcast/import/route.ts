import { feedRssAdd } from "@lib/service/podcast";
import {NextRequest} from "next/server";

export const POST = async (request: NextRequest) => {
  const {rss} = await request.json();
  console.debug("import rss", rss);
  try {
    const data = await feedRssAdd(rss);

    if (data.message !== "ok") {
      return new Response(JSON.stringify(data), {status: 400});
    }

    return new Response(JSON.stringify(data), {status: 200});
  } catch (err) {
    console.error(err);
    return new Response("", {status: 500});
  }
};
