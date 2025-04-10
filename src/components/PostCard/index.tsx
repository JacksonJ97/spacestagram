import avatar from "assets/images/nasa-avatar.jpg";

type Post = {
  date: string;
  url: string;
  title: string;
  liked: boolean;
  explanation: string;
};

// TODO: Style this when data is available
// TODO: Implement own toast component
export default function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <header>
        <img src={avatar} alt="avatar" />
        <p>nasa</p>
      </header>

      <figure>
        <img src={post.url} alt={post.title} />
      </figure>

      <section className="actions-container">
        <span>Like</span>
        <span>Share</span>
      </section>

      <section className="details-container">
        <h2>{post.title}</h2>
        <p>{post.explanation}</p>
        <p className="date">{post.date}</p>
      </section>
    </article>
  );
}
