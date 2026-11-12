export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="py-6 text-center text-(--text-color)">
      <h2 className="text-2xl font-semibold">Oops! Something went wrong.</h2>
      <p className="mt-3">{message}</p>
    </div>
  );
}
