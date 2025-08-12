import { Router } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import validateRequestBody from "../../middlewares/request-body-validator";
import {
  handleGetLikedPosts,
  handleLikePost,
  handleUnlikePost,
} from "../../controllers/liked-posts/controller";
import { likePostSchema } from "../../controllers/liked-posts/schema";

const router = Router();

router.get("/", authenticateUser, handleGetLikedPosts);
router.post(
  "/",
  authenticateUser,
  validateRequestBody(likePostSchema),
  handleLikePost
);
router.delete("/:date", authenticateUser, handleUnlikePost);

export default router;
