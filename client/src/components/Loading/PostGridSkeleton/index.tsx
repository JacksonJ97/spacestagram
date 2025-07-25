type PostGridSkeletonProps = {
  count?: number;
};

export default function PostGridSkeleton({ count = 9 }: PostGridSkeletonProps) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-3 gap-1 min-md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="aspect-square w-full max-w-72 animate-pulse bg-(--secondary-background-color)"
          key={index}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
