import { Request, Response } from "express";

function handleCreateUser(req: Request, res: Response) {
  res.json({ message: "Create a new user" });
}

function handleGetUser(req: Request, res: Response) {
  res.json({ message: `Get user with ID: ${req.params.id}` });
}

export { handleCreateUser, handleGetUser };
