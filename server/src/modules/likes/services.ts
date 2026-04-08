import {
  getUserById,
  getLikedPostsByUserId,
  getPostByDate,
  getOrCreatePost,
  createOrTouchLikedPost,
  deleteLikedPost,
} from "db/queries";
import { NotFoundError } from "utils/errors";

export async function getUserLikedPosts(userId: number) {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const posts = await getLikedPostsByUserId(userId);

  return posts;
}

export async function likePost({
  userId,
  date,
  title,
  url,
}: {
  userId: number;
  date: string;
  title: string;
  url: string;
}) {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const post = await getOrCreatePost({ date, title, url });

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  await createOrTouchLikedPost({ userId: user.id, postId: post.id });
}

export async function unlikePost({
  userId,
  date,
}: {
  userId: number;
  date: string;
}) {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const post = await getPostByDate(date);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  await deleteLikedPost({ userId: user.id, postId: post.id });
}
