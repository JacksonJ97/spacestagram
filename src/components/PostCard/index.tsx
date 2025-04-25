import { useState } from "react";
import { toast } from "sonner";
import avatar from "assets/images/nasa-avatar.jpg";
import type { Post } from "data/nasa/types";
import HeartIcon from "components/common/Icons/Heart";
import ShareIcon from "components/common/Icons/Share";
import FilledHeartIcon from "components/common/Icons/FilledHeart";

export default function PostCard({
  post,
  handleOpenDialog,
}: {
  post: Post;
  handleOpenDialog: () => void;
}) {
  const isUserLoggedIn = false; // TODO: Replace with actual authentication logic
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isUserLoggedIn) {
      handleOpenDialog();
      return;
    }
    setIsLiked((prev) => !prev);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(post.url);
    toast("Link copied to your clipboard!");
  };

  return (
    <article className="bg-(--background-color max-w-xl rounded-xs border border-(--border-color)">
      <header className="flex items-center gap-3 p-4">
        <img className="h-8 w-8 rounded-full" src={avatar} alt="User avatar" />
        <p className="text-sm font-medium text-(--text-color)">nasa</p>
      </header>

      <figure>
        <img src={post.url} alt={post.title} />
      </figure>

      <div className="flex items-center px-2 pt-2">
        <button
          type="button"
          onClick={handleLike}
          className="group flex h-10 w-10 cursor-pointer items-center justify-center"
        >
          {isLiked ? (
            <FilledHeartIcon
              width={24}
              height={24}
              aria-label="Unlike"
              className="animate-pulsate-fwd text-red-500"
            />
          ) : (
            <HeartIcon
              width={24}
              height={24}
              aria-label="Like"
              className="text-(--text-color) group-hover:text-(--text-color)/75"
            />
          )}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-(--text-color) hover:text-(--text-color)/75"
        >
          <ShareIcon width={24} height={24} />
        </button>
      </div>

      <section className="px-4 pt-2 pb-4">
        <h2 className="text-2xl font-medium text-(--text-color)">
          {post.title}
        </h2>
        <p className="mt-4 text-sm text-(--text-color)">{post.explanation}</p>
        <p className="mt-4 text-xs text-(--text-color)">{post.date}</p>
      </section>
    </article>
  );
}
