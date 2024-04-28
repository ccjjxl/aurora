import {db} from "@lib/db/db";
import {NextRequest} from "next/server";

export const POST = async (request: NextRequest) => {
  const {id, listened} = await request.json();
  if (!id) {
    return new Response(JSON.stringify({}), {status: 400});
  }

  await db.episodes.update({
    where: {
      id: parseInt(id),
    },
    data: {
      Listened: listened,
    },
  });

  return new Response(JSON.stringify({msg: "success"}), {status: 200});
};
