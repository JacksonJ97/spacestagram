import PostPreviewCard from "components/PostPreviewCard";

export default function Likes() {
  const data = [] as {
    id: string;
    date: string;
    url: string;
    title: string;
    liked: boolean;
  }[];

  return (
    <main className="min-h-[calc(100vh-60px)] bg-(--background-color) px-4 py-8">
      <section className="mx-auto flex max-w-4xl flex-wrap gap-1 min-md:gap-6">
        {data.map((post) => {
          if (!post.liked) return null;
          return <PostPreviewCard post={post} key={post.date} />;
        })}
      </section>
    </main>
  );
}
