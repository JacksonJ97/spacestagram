import { useParams } from "react-router";
import { usePost } from "data/nasa/hooks";
import PostCard from "components/PostCard";
import ErrorMessage from "components/Error/ErrorMessage";
import LoadingSpinner from "components/Loading/LoadingSpinner";

export default function PostDetails() {
  const params = useParams();

  const {
    data: post,
    isPending: isPostPending,
    isError: isPostError,
  } = usePost({ date: params.date! }); // The `date` parameter is always defined in the route pattern (e.g., /posts/:date)

  if (isPostPending) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isPostError) {
    return (
      <ErrorMessage message="We couldn't load the post. Please try again shortly." />
    );
  }

  return (
    <div className="flex flex-col items-center">
      <PostCard post={post} />
    </div>
  );
}
