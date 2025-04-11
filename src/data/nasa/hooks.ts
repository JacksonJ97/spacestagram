import { format, subDays } from "date-fns";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import type { Post } from "data/nasa/types";

const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}`;

export const usePosts = () => {
  const fetchPosts = async ({ pageParam }: { pageParam: Date }) => {
    const endDate = format(pageParam, "yyyy-MM-dd");
    const startDate = format(subDays(pageParam, 9), "yyyy-MM-dd");

    const response = await fetch(
      `${BASE_URL}&start_date=${startDate}&end_date=${endDate}`,
    );
    const data: Post[] = await response.json();

    return data.reverse();
  };

  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: new Date(),
    getNextPageParam: (lastPage) => {
      const oldest = new Date(lastPage[lastPage.length - 1].date);
      return subDays(oldest, 1);
    },
  });
};

export const usePost = ({ date }: { date: string }) => {
  const fetchPost = async () => {
    const response = await fetch(`${BASE_URL}&date=${date}`);
    const data: Post = await response.json();
    return data;
  };

  return useQuery({
    queryKey: ["post", date],
    queryFn: fetchPost,
  });
};
