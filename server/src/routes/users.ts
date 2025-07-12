import { Router } from "express";
import { newUserSchema } from "../schemas/users";
import { validateRequestBody } from "../utils/functions";
import { handleCreateUser, handleGetUser } from "../controllers/users";

const router = Router();

router.post("/", validateRequestBody(newUserSchema), handleCreateUser);
router.get("/:id", handleGetUser);

export default router;
