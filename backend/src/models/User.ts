import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  userType: "client" | "freelancer";
  bio?: string;
  skills?: string[];
  location?: string;
  profileImage?: string;
  reviews?: {
    rating: number;
    review: string;
    reviewer: mongoose.Types.ObjectId;
  }[];
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["client", "freelancer"], required: true },
  bio: { type: String },
  skills: [{ type: String }],
  location: { type: String },
  profileImage: { type: String },
  reviews: [
    {
      rating: { type: Number, required: true },
      review: { type: String, required: true },
      reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
