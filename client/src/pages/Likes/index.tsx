import { useQuery } from "@tanstack/react-query";
import { getLikedPostsOptions } from "data/liked-posts/hooks";
import ErrorMessage from "components/Error/ErrorMessage";
import PostPreviewCard from "components/PostPreviewCard";
import PostGridSkeleton from "components/Loading/PostGridSkeleton";

export default function Likes() {
  const {
    data: posts,
    isPending: isLikedPostsPending,
    isError: isLikedPostsErorr,
  } = useQuery({ ...getLikedPostsOptions });

  if (isLikedPostsPending) {
    return <PostGridSkeleton count={9} />;
  }

  if (isLikedPostsErorr) {
    return (
      <ErrorMessage message="We couldn't load the liked posts. Please try again shortly." />
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-6">
        <h2 className="text-center text-2xl font-semibold text-(--text-color)">
          You haven't liked any posts yet.
        </h2>
        <p className="mt-3 text-center text-(--text-color)">
          Start exploring and tap the like button to save your favorites!
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto grid max-w-4xl grid-cols-3 gap-1 md:gap-6">
      {posts.map((post) => (
        <PostPreviewCard post={post} key={post.id} />
      ))}
    </section>
  );
}
