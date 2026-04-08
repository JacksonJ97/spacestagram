import { Router } from "express";
import auth from "modules/auth/routes";
import users from "modules/users/routes";
import likedPosts from "modules/likes/routes";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/liked-posts", likedPosts);

export default router;
