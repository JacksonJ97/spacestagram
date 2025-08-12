import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK } from "../../constants/http";
import { NotFoundError, BadRequestError } from "../../utils/errors";
import {
  getUserById,
  getPostByDate,
  deleteLikedPost,
  getLikedPostsByUserId,
  getOrCreatePost,
  createLikedPost,
} from "../../db/queries";
import { likePostSchema } from "../../controllers/liked-posts/schema";

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

    const likedPost = await createLikedPost({
      userId: user.id,
      postId: post.id,
    });

    return res.status(OK).json({ message: "Post liked" });
  } catch (error) {
    next(error);
  }
}

async function handleUnlikePost(
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

    const post = await getPostByDate(req.params.date);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const result = await deleteLikedPost({ userId: user.id, postId: post.id });

    if (result.length === 0) {
      throw new NotFoundError("Unable to unlike a post that hasn't been liked");
    }

    return res.status(OK).json({ message: "Post unliked" });
  } catch (error) {
    next(error);
  }
}

export { handleGetLikedPosts, handleLikePost, handleUnlikePost };
