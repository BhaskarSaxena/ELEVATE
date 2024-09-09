import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";
import asyncWrapper from "../utils/asyncWrapper";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });
const JWT_SECRET = process.env.JWT_SECRET as string;

router.post(
  "/signup",
  asyncWrapper(async (req: Request, res: Response) => {
    const { username, email, password, userType, bio, skills, location } =
      req.body;

    if (!username || !email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: "Username, email, password, and userType are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
      bio,
      skills,
      location,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
    });
  }),
);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      message: "Login successful.",
      token,
    });
  },
);

export default router;
