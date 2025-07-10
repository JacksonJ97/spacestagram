import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  res.json({ message: "Login route" });
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logout route" });
});

export default router;
