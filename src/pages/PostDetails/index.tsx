import { useParams } from "react-router";
import { usePost } from "data/nasa/hooks";
import PostCard from "components/PostCard";
import PageContent from "components/PageContent";
import LoadingSpinner from "components/LoadingSpinner";
import ErrorPage from "components/ErrorPage";

export default function PostDetails() {
  const params = useParams();

  const {
    data: post,
    isPending: isPostPending,
    isError: isPostError,
  } = usePost({ date: params.date! }); // The `date` parameter is always defined in the route pattern (e.g., /posts/:date)

  if (isPostPending) {
    return (
      <PageContent>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </PageContent>
    );
  }

  if (isPostError) {
    return (
      <PageContent>
        <ErrorPage message="We couldn't load the post. Please try again shortly." />
      </PageContent>
    );
  }

  return (
    <PageContent>
      <div className="flex flex-col items-center">
        <PostCard post={post} />
      </div>
    </PageContent>
  );
}
