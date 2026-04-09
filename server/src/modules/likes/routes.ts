import { Router } from "express";
import requireAuth from "middlewares/require-auth";
import validate from "middlewares/request-validator";
import {
  handleGetLikedPosts,
  handleLikePost,
  handleUnlikePost,
} from "modules/likes/controllers";
import { likePostSchema } from "modules/likes/schemas";

const router = Router();

router.get("/", requireAuth, handleGetLikedPosts);
router.post("/", requireAuth, validate(likePostSchema), handleLikePost);
router.delete("/:date", requireAuth, handleUnlikePost);

export default router;
