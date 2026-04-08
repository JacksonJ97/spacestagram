import { Router } from "express";
import auth from "modules/auth/route";
import users from "modules/users/route";
import likedPosts from "modules/likes/route";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/liked-posts", likedPosts);

export default router;
