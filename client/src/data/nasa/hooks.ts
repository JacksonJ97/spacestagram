import ky from "ky";
import { format, subDays, parseISO } from "date-fns";
import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import type { Post } from "data/nasa/types";

const BASE_URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";

export const infinitePostOptions = infiniteQueryOptions({
  queryKey: ["posts"],
  queryFn: async ({ pageParam }: { pageParam: Date }) => {
    const startDate = format(subDays(pageParam, 9), "yyMMdd");
    const endDate = format(pageParam, "yyMMdd");

    const data = await ky
      .get<Post[]>(`${BASE_URL}?date_from=${startDate}&date_to=${endDate}`)
      .json();

    return data;
  },
  initialPageParam: new Date(),
  getNextPageParam: (posts) => {
    const post = posts[posts.length - 1];

    if (!post) return undefined;

    const oldest = parseISO(post.date);
    return subDays(oldest, 1);
  },
  select: (data) => {
    const pages = data.pages.flat().filter((post) => post.media_type == "image");
    return { ...data, pages };
  },
  gcTime: 60 * 60 * 1000, // 1 hour
  staleTime: 15 * 60 * 1000, // 15 minutes
});

export const postOptions = (date: string | null) =>
  queryOptions({
    queryKey: ["post", date],
    queryFn: async () => {
      const data = await ky.get<Post>(`${BASE_URL}/${date}`).json();
      return data;
    },
    enabled: !!date,
    gcTime: 60 * 60 * 1000, // 1 hour
    staleTime: Infinity,
  });
