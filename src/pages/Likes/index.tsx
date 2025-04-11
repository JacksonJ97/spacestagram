import { Post } from "data/nasa/types";
import PageContent from "components/PageContent";
import PostPreviewCard from "components/PostPreviewCard";

type Data = Post & { liked: boolean };

export default function Likes() {
  const data = [] as Data[];

  return (
    <PageContent>
      <section className="mx-auto flex max-w-4xl flex-wrap gap-1 min-md:gap-6">
        {data.map((post) => {
          if (!post.liked) return null;
          return <PostPreviewCard post={post} key={post.date} />;
        })}
      </section>
    </PageContent>
  );
}
