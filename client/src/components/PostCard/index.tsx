import { toast } from "sonner";
import avatar from "assets/images/nasa-avatar.jpg";
import type { Post } from "data/nasa/types";
import { useLikePost, useUnlikePost } from "data/liked-posts/hooks";
import HeartIcon from "components/common/Icons/Heart";
import ShareIcon from "components/common/Icons/Share";
import FilledHeartIcon from "components/common/Icons/FilledHeart";

export default function PostCard({
  post,
  isLiked,
  isLoggedIn,
  handleOpenDialog,
  ref,
}: {
  post: Post;
  isLiked: boolean;
  isLoggedIn: boolean;
  handleOpenDialog: () => void;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const pathname = window.location.origin;

  const { mutate: likePost, isPending: isLikingPost } = useLikePost();
  const { mutate: unlikePost, isPending: isUnlikingPost } = useUnlikePost();

  const toggleLike = () => {
    if (!isLoggedIn) {
      handleOpenDialog();
      return;
    }
    if (isLiked) {
      unlikePost(post.date);
    } else {
      likePost({ date: post.date, title: post.title, url: post.hdurl });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${pathname}/posts/${post.date}`);
    toast("Link copied to your clipboard!");
  };

  const cleanExplanation = (html: string) => {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/^Explanation:\s*/, "")
      .replace(/Tomorrow's picture:.*$/s, "")
      .trim();
  };

  const explanation = cleanExplanation(post.explanation);

  return (
    <article
      ref={ref}
      className="max-w-xl rounded-xs border border-(--border-color) bg-(--background-color) text-(--text-color)"
    >
      <header className="flex items-center gap-3 p-4">
        <img src={avatar} alt="User avatar" className="size-8 rounded-full" />
        <p className="text-sm font-medium">nasa</p>
      </header>

      <figure>
        <img src={post.hdurl} alt={post.alt} />
      </figure>

      <div className="flex items-center px-2 pt-2">
        <button
          type="button"
          onClick={toggleLike}
          data-loading={isLikingPost || isUnlikingPost}
          aria-label={isLiked ? "Unlike post" : "Like post"}
          className="group flex size-10 cursor-pointer items-center justify-center data-[loading=true]:pointer-events-none"
        >
          {isLiked ? (
            <FilledHeartIcon
              width={24}
              height={24}
              aria-hidden="true"
              className="animate-pulsate-fwd text-red-500"
            />
          ) : (
            <HeartIcon
              width={24}
              height={24}
              aria-hidden="true"
              className="group-hover:text-(--text-color)/75"
            />
          )}
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Copy post link"
          className="flex size-10 cursor-pointer items-center justify-center hover:text-(--text-color)/75"
        >
          <ShareIcon width={24} height={24} aria-hidden="true" />
        </button>
      </div>

      <section className="px-4 pt-2 pb-4">
        <h2 className="text-2xl font-medium">{post.title}</h2>
        <p className="mt-4 text-sm">{explanation}</p>
        <p className="mt-4 text-xs">{post.date}</p>
      </section>
    </article>
  );
}
