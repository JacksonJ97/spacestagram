import { Router } from "express";
import auth from "routes/auth/route";
import users from "routes/users/route";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);

export default router;
