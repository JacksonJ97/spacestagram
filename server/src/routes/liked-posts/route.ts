import { Router } from "express";
import {
  handleGetLikedPosts,
  handleLikePost,
  handleUnlikePost,
} from "controllers/liked-posts/controller";
import authenticateUser from "middlewares/authenticate-user";

const router = Router();

router.get("/", authenticateUser, handleGetLikedPosts);
router.post("/", authenticateUser, handleLikePost);
router.delete("/", authenticateUser, handleUnlikePost);

export default router;
