import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Hooks
import { usePosts } from "data/nasa/hooks";

// Components
import PostCard from "components/PostCard";
import LoadingSpinner from "components/LoadingSpinner";

export default function Home() {
  const { ref, inView } = useInView();

  const {
    data: posts,
    fetchNextPage: fetchNextPosts,
    isLoading: isPostsLoading,
    isFetching: isFetchingPosts,
  } = usePosts();

  useEffect(() => {
    if (inView) {
      fetchNextPosts();
    }
  }, [inView, fetchNextPosts]);

  return (
    <main className="min-h-[calc(100vh-60px)] bg-(--background-color) px-4 py-8">
      <section className="flex flex-col items-center gap-6">
        {posts
          ? posts.pages
              .flat()
              .filter((post) => post.media_type == "image")
              .map((post) => <PostCard post={post} key={post.date} />)
          : null}
        {(isPostsLoading || isFetchingPosts) && <LoadingSpinner />}
      </section>
      <div ref={ref} />
    </main>
  );
}
