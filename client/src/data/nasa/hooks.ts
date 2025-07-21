import axios from "axios";
import { format, subDays } from "date-fns";
import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import type { Post } from "data/nasa/types";
import { NASA_API_KEY } from "utils/constants";

const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export const infinitePostOptions = infiniteQueryOptions({
  queryKey: ["posts"],
  queryFn: async ({ pageParam }: { pageParam: Date }) => {
    const endDate = format(pageParam, "yyyy-MM-dd");
    const startDate = format(subDays(pageParam, 9), "yyyy-MM-dd");

    const data = await axios
      .get<Post[]>(`${BASE_URL}&start_date=${startDate}&end_date=${endDate}`)
      .then((response) => response.data);

    return data.reverse();
  },
  initialPageParam: new Date(),
  getNextPageParam: (lastPage) => {
    const oldest = new Date(lastPage[lastPage.length - 1].date);
    return subDays(oldest, 1);
  },
});

export const postOptions = (date: string) =>
  queryOptions({
    queryKey: ["post", date],
    queryFn: async () => {
      const data = await axios
        .get<Post>(`${BASE_URL}&date=${date}`)
        .then((response) => response.data);
      return data;
    },
  });
