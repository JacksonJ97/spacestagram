import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infinitePostOptions } from "data/nasa/hooks";
import PostCard from "components/PostCard";
import LikeAuthDialog from "components/LikeAuthDialog";
import ErrorMessage from "components/Error/ErrorMessage";
import LoadingSpinner from "components/Loading/LoadingSpinner";

export default function Home() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(false);

  const {
    data: posts,
    fetchNextPage: fetchNextPosts,
    isPending: isPostsPending,
    isError: isPostsError,
    isFetching: isFetchingPosts,
  } = useInfiniteQuery({ ...infinitePostOptions });

  useEffect(() => {
    if (inView) {
      fetchNextPosts();
    }
  }, [inView, fetchNextPosts]);

  if (isPostsPending) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isPostsError) {
    return (
      <ErrorMessage message="We couldn't load the posts. Please try again shortly." />
    );
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <section className="flex flex-col items-center gap-6">
      {posts.pages
        .flat()
        .filter((post) => post.media_type == "image")
        .map((post) => (
          <PostCard
            post={post}
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
