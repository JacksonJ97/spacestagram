import PostCard from "../../components/PostCard";

export default function PostDetails() {
  const post = {
    url: "https://example.com/image.jpg",
    title: "Sample Title",
    date: "2023-10-01",
    liked: false,
    explanation: "Sample Explanation",
  };

  return (
    <main className="min-h-[calc(100vh-60px)] bg-(--background-color) px-4 py-8">
      <PostCard post={post} />
    </main>
  );
}
