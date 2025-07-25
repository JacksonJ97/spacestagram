import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { BadRequestError } from "utils/errors";
import { getLikedPostsByUserId, getUserById } from "db/queries";

async function handleGetLikedPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId as number; // Validated from authenticate user middleware

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

async function handleLikePost(
  req: Request,
  res: Response,
  next: NextFunction
) {}

async function handleUnlikePost(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export { handleGetLikedPosts, handleLikePost, handleUnlikePost };
