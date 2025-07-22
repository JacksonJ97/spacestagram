export default function PostSkeleton() {
  return (
    <>
      <div className="h-screen w-xl animate-pulse rounded-lg bg-(--secondary-background-color)"></div>
      <span className="sr-only">Loading...</span>
    </>
  );
}
