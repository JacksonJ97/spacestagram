import { Link } from "react-router";
import type { Post } from "data/nasa/types";

export default function PostPreviewCard({ post }: { post: Post }) {
  return (
    <div>
      <Link to={`/posts/${post.date}`}>
        <div className="hover"></div>
        <img src={post.url} alt={post.title} />
      </Link>
    </div>
  );
}
