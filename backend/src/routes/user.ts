import express, { Request, Response } from "express";
const router = express.Router();
import UserModel from "../models/user";

router.post("/addUser", async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      throw new Error("Invalid request");
    }
    const newUser = new UserModel(req.body);
    await newUser.save();

    res.status(200).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
});

export default router;
