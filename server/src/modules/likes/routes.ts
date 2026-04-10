import { Router } from "express";
import requireAuth from "middlewares/require-auth";
import validate from "middlewares/request-validator";
import { likePostSchema } from "modules/likes/schemas";
import {
  handleGetLikedPosts,
  handleLikePost,
  handleUnlikePost,
} from "modules/likes/controllers";

const router = Router();

router.get("/", requireAuth, handleGetLikedPosts);
router.post("/", requireAuth, validate(likePostSchema), handleLikePost);
router.delete("/:date", requireAuth, handleUnlikePost);

export default router;
