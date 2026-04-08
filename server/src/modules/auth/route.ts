import { Router } from "express";
import {
  handleUserLogin,
  handleUserLogout,
  handleTokenRefresh,
} from "modules/auth/controller";
import { userLoginSchema } from "modules/auth/schema";
import validateRequestBody from "middlewares/request-body-validator";

const router = Router();

router.post("/login", validateRequestBody(userLoginSchema), handleUserLogin);
router.post("/logout", handleUserLogout);
router.post("/refresh", handleTokenRefresh);

export default router;
