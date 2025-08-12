import { Router } from "express";
import auth from "../routes/auth/route";
import users from "../routes/users/route";
import likedPosts from "../routes/liked-posts/route";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/liked-posts", likedPosts);

export default router;
