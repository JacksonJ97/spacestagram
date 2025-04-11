export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-60px)] bg-(--background-color) px-4 py-8">
      {children}
    </main>
  );
}
