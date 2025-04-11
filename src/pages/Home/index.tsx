import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePosts } from "data/nasa/hooks";
import PostCard from "components/PostCard";
import ErrorPage from "components/ErrorPage";
import PageContent from "components/PageContent";
import LoadingSpinner from "components/LoadingSpinner";

export default function Home() {
  const { ref, inView } = useInView();

  const {
    data: posts,
    fetchNextPage: fetchNextPosts,
    isPending: isPostsPending,
    isError: isPostsError,
    isFetching: isFetchingPosts,
  } = usePosts();

  useEffect(() => {
    if (inView) {
      fetchNextPosts();
    }
  }, [inView, fetchNextPosts]);

  if (isPostsPending) {
    return (
      <PageContent>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </PageContent>
    );
  }

  if (isPostsError) {
    return (
      <PageContent>
        <ErrorPage message="We couldn't load the posts. Please try again shortly." />
      </PageContent>
    );
  }

  return (
    <PageContent>
      <section className="flex flex-col items-center gap-6">
        {posts.pages
          .flat()
          .filter((post) => post.media_type == "image")
          .map((post) => (
            <PostCard post={post} key={post.date} />
          ))}
        {isFetchingPosts && <LoadingSpinner />}
      </section>
      <div ref={ref} />
    </PageContent>
  );
}
