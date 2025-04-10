export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-60px)] bg-(--background-color) px-4 py-8">
      <div className="py-6">
        <h2 className="text-center text-2xl font-semibold text-(--text-color)">
          Sorry, this page isn't available.
        </h2>
        <p className="mt-4 text-center text-(--text-color)">
          The link you followed may be broken, or the page may have been
          removed.
        </p>
      </div>
    </main>
  );
}
