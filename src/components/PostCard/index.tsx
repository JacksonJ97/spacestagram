import avatar from "assets/images/nasa-avatar.jpg";
import type { Post } from "data/nasa/types";

// TODO: Implement own toast component
export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-(--background-color max-w-xl rounded-xs border border-(--border-color)">
      <header className="flex items-center gap-3 p-4">
        <img className="h-8 w-8 rounded-full" src={avatar} alt="User avatar" />
        <p className="text-sm font-medium text-(--text-color)">nasa</p>
      </header>

      <figure>
        <img src={post.url} alt={post.title} />
      </figure>

      <section className="p-4">
        <div className="flex items-center gap-4">
          <span className="text-(--text-color)">Like</span>
          <span className="text-(--text-color)">Share</span>
        </div>

        <h2 className="mt-2 text-2xl font-medium text-(--text-color)">
          {post.title}
        </h2>
        <p className="mt-4 text-sm text-(--text-color)">{post.explanation}</p>
        <p className="mt-4 text-xs text-(--text-color)">{post.date}</p>
      </section>
    </article>
  );
}
