import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { likePostSchema } from "modules/likes/schemas";
import {
  getUserLikedPosts,
  likePost,
  unlikePost,
} from "modules/likes/services";

async function handleGetLikedPosts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.auth!.userId;
    const posts = await getUserLikedPosts(userId);

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
  next: NextFunction,
) {
  try {
    const userId = req.auth!.userId;
    const { date, title, url } = req.body;

    await likePost({ userId, date, title, url });

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
  next: NextFunction,
) {
  try {
    const userId = req.auth!.userId;

    await unlikePost({ userId, date: req.params.date });

    return res.status(OK).json({ message: "Post unliked" });
  } catch (error) {
    next(error);
  }
}

export { handleGetLikedPosts, handleLikePost, handleUnlikePost };
