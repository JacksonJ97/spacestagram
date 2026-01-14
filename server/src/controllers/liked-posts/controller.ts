import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { NotFoundError, BadRequestError } from "utils/errors";
import {
  getUserById,
  getPostByDate,
  deleteLikedPost,
  getLikedPostsByUserId,
  getOrCreatePost,
  createOrTouchLikedPost,
} from "db/queries";
import { likePostSchema } from "controllers/liked-posts/schema";

async function handleGetLikedPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId as number;
    const user = await getUserById(userId);

    if (!user) {
      throw new BadRequestError("Request could not be processed");
    }

    const posts = await getLikedPostsByUserId(user.id);

    return res.status(OK).json(posts);
  } catch (error) {
    next(error);
  }
}

interface LikePostRequest extends Request {
  body: z.infer<typeof likePostSchema>;
}

async function handleLikePost(
  req: LikePostRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId as number;
    const user = await getUserById(userId);

    if (!user) {
      throw new BadRequestError("Request could not be processed");
    }

    const { date, title, url } = req.body;
    const post = await getOrCreatePost({ date, title, url });

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    await createOrTouchLikedPost({ userId: user.id, postId: post.id });

    return res.status(OK).json({ message: "Post liked" });
  } catch (error) {
    next(error);
  }
}

interface UnlikePostRequest extends Request {
  params: { date: string };
}

async function handleUnlikePost(
  req: UnlikePostRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId as number;
    const user = await getUserById(userId);

    if (!user) {
      throw new BadRequestError("Request could not be processed");
    }

    const post = await getPostByDate(req.params.date);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    await deleteLikedPost({ userId: user.id, postId: post.id });

    return res.status(OK).json({ message: "Post unliked" });
  } catch (error) {
    next(error);
  }
}

export { handleGetLikedPosts, handleLikePost, handleUnlikePost };
