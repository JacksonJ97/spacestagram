export default function ErrorPage({ message }: { message: string }) {
  return (
    <div className="py-6">
      <h2 className="text-center text-2xl font-semibold text-(--text-color)">
        Oops! Something went wrong.
      </h2>
      <p className="mt-3 text-center text-(--text-color)">{message}</p>
    </div>
  );
}
