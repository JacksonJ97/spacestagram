import { Router } from "express";
import authenticateUser from "middlewares/authenticate-user";
import validateRequestBody from "middlewares/request-body-validator";
import {
  handleGetLikedPosts,
  handleLikePost,
  handleUnlikePost,
} from "modules/likes/controller";
import { likePostSchema } from "modules/likes/schema";

const router = Router();

router.get("/", authenticateUser, handleGetLikedPosts);
router.post(
  "/",
  authenticateUser,
  validateRequestBody(likePostSchema),
  handleLikePost,
);
router.delete("/:date", authenticateUser, handleUnlikePost);

export default router;
