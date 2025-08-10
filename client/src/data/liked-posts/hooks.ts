import { toast } from "sonner";
import {
  useMutation,
  queryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import api from "config/api";
import { getErrorMessage } from "utils/functions";
import { currentUserOptions } from "data/user/hooks";
import type { LikedPost, LikePostInput } from "data/liked-posts/types";

export const getLikedPostsOptions = queryOptions({
  queryKey: ["liked-posts"],
  queryFn: async () => {
    const data = await api
      .get<LikedPost[]>("/api/liked-posts")
      .then((response) => response.data);
    return data;
  },
  gcTime: Infinity,
  staleTime: Infinity,
});

export function useLikePost() {
  const client = useQueryClient();

  const likePost = async (post: LikePostInput) => {
    const data = await api
      .post<{ message: string }>("/api/liked-posts", post)
      .then((response) => response.data);
    return data;
  };

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: currentUserOptions.queryKey });
      client.invalidateQueries({ queryKey: getLikedPostsOptions.queryKey });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}

export function useUnlikePost() {
  const client = useQueryClient();

  const unlikePost = async (date: string) => {
    const data = await api
      .delete<{ message: string }>(`/api/liked-posts/${date}`)
      .then((response) => response.data);
    return data;
  };

  return useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: currentUserOptions.queryKey });
      client.invalidateQueries({ queryKey: getLikedPostsOptions.queryKey });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
