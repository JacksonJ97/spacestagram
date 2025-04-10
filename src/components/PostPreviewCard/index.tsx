import { Link } from "react-router";

type Post = {
  date: string;
  url: string;
  title: string;
};

export default function PostPreviewCard({ post }: { post: Post }) {
  return (
    <div>
      <Link to={`/likes/${post.date}`}>
        <div className="hover"></div>
        <img src={post.url} alt={post.title} />
      </Link>
    </div>
  );
}
