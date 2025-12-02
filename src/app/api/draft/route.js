import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import getAPIData from "@/utils/API";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  const post = await getAPIData(slug);
  if (post.error) {
    return new Response("Invalid Slug", { status: 401 });
  }
  draftMode().enable();
  redirect(`${slug}`);
}
