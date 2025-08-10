import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { currentUserOptions } from "data/user/hooks";
import { infinitePostOptions } from "data/nasa/hooks";
import PostCard from "components/PostCard";
import LikeAuthDialog from "components/LikeAuthDialog";
import ErrorMessage from "components/Error/ErrorMessage";
import PostSkeleton from "components/Loading/PostSkeleton";
import LoadingSpinner from "components/Loading/LoadingSpinner";

export default function Home() {
  const {
    data: posts,
    fetchNextPage: fetchNextPosts,
    isPending: isPostsPending,
    isError: isPostsError,
    isFetching: isFetchingPosts,
  } = useInfiniteQuery({ ...infinitePostOptions });

  const [open, setOpen] = useState(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isFetchingPosts) {
        fetchNextPosts();
      }
    },
  });

  const { data: user } = useQuery({ ...currentUserOptions });

  if (isPostsPending) {
    return (
      <div className="flex justify-center">
        <PostSkeleton />
      </div>
    );
  }

  if (isPostsError) {
    return (
      <ErrorMessage message="We couldn't load the posts. Please try again shortly." />
    );
  }

  const isLoggedIn = !!user;
  const likedPosts = new Set(user ? user.likedPosts : []);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <section className="flex flex-col items-center gap-6">
      {posts.pages.map((post) => (
        <PostCard
          post={post}
          isLoggedIn={isLoggedIn}
          isLiked={likedPosts.has(post.date)}
          handleOpenDialog={handleOpenDialog}
          key={post.date}
        />
      ))}
      {isFetchingPosts && <LoadingSpinner />}
      <LikeAuthDialog open={open} onOpenChange={onOpenChange} />
      <div ref={ref} />
    </section>
  );
}
