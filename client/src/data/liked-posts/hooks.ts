import { queryOptions } from "@tanstack/react-query";
import { api } from "utils/api";
import { LikedPost } from "data/liked-posts/types";

export const getLikedPostsOptions = queryOptions({
  queryKey: ["liked-posts"],
  queryFn: async () => {
    const data = await api
      .get<LikedPost[]>("/api/liked-posts")
      .then((response) => response.data);
    return data;
  },
});
