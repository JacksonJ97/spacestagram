import InfiniteScroll from "react-infinite-scroll-component";

// Components
import PostCard from "../../components/PostCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Home() {
  const data = [] as {
    date: string;
    url: string;
    title: string;
    liked: boolean;
    explanation: string;
  }[];

  const handleNext = () => {
    // TODO: Implement logic for fetching next data
    console.log("Fetch next data...");
  };

  return (
    <main className="min-h-[calc(100vh-60px)] bg-(--background-color) px-4 py-8">
      <InfiniteScroll
        dataLength={data.length}
        next={handleNext}
        scrollThreshold={0.9}
        hasMore={true}
        loader={<LoadingSpinner />}
      >
        <section className="flex flex-col items-center gap-6">
          {data.map((post) => (
            <PostCard post={post} key={post.date} />
          ))}
        </section>
      </InfiniteScroll>
    </main>
  );
}
