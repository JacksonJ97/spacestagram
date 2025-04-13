import { Link } from "react-router";
import type { Post } from "data/nasa/types";

export default function PostPreviewCard({ post }: { post: Post }) {
  return (
    <div className="relative aspect-square">
      <Link to={`/posts/${post.date}`}>
        <div className="absolute h-full w-full hover:bg-black/50"></div>
        <img
          src={post.url}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </Link>
    </div>
  );
}
