import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { postOptions } from "data/nasa/hooks";
import { currentUserOptions } from "data/user/hooks";
import PostCard from "components/PostCard";
import LikeAuthDialog from "components/LikeAuthDialog";
import ErrorMessage from "components/Error/ErrorMessage";
import PostSkeleton from "components/Loading/PostSkeleton";

export default function PostDetails() {
  const { date } = useParams();
  const [open, setOpen] = useState(false);

  const {
    data: post,
    isPending: isPostPending,
    isError: isPostError,
  } = useQuery({ ...postOptions(date!) }); // The `date` is always defined in the route pattern (e.g., /posts/:date)

  const { data: user } = useQuery({ ...currentUserOptions });

  if (isPostPending) {
    return (
      <div className="flex justify-center">
        <PostSkeleton />
      </div>
    );
  }

  if (isPostError) {
    return (
      <ErrorMessage message="We couldn't load the post. Please try again shortly." />
    );
  }

  const isLoggedIn = !!user;
  const likedPosts = user ? user.likedPosts : [];

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <div className="flex flex-col items-center">
      <PostCard
        post={post}
        isLoggedIn={isLoggedIn}
        isLiked={likedPosts.includes(post.date)}
        handleOpenDialog={handleOpenDialog}
      />
      <LikeAuthDialog open={open} onOpenChange={onOpenChange} />
    </div>
  );
}
