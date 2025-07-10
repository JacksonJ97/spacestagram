import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.json({ message: "Create a new user" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Get user with ID: ${req.params.id}` });
});

export default router;
