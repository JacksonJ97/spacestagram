import { Link } from "react-router";
import type { LikedPost } from "data/liked-posts/types";

export default function PostPreviewCard({ post }: { post: LikedPost }) {
  return (
    <div className="relative aspect-square">
      <Link to={`/posts/${post.date}`}>
        <div className="absolute size-full hover:bg-black/50"></div>
        <img src={post.url} alt={post.title} className="size-full object-cover" />
      </Link>
    </div>
  );
}
