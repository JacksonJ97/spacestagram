import { Router } from "express";
import { handleUserLogin, handleUserLogout } from "../controllers/auth";
import validateRequestBody from "../middlewares/request-body-validator";
import { userLoginSchema } from "../schemas/auth";

const router = Router();

router.post("/login", validateRequestBody(userLoginSchema), handleUserLogin);
router.post("/logout", handleUserLogout);

export default router;
