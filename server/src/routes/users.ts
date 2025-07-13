import { Router } from "express";
import { newUserSchema } from "../schemas/users";
import validateRequestBody from "../middlewares/request-body-validator";
import { handleCreateUser } from "../controllers/users";

const router = Router();

router.post("/", validateRequestBody(newUserSchema), handleCreateUser);

export default router;
