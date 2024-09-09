import mongoose, { Schema, Document } from "mongoose";

export interface IGig extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  freelancer: mongoose.Types.ObjectId;
  reviews?: {
    rating: number;
    review: string;
    reviewer: mongoose.Types.ObjectId;
  }[];
  createdAt: Date;
}

const GigSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  freelancer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviews: [
    {
      rating: { type: Number, required: true },
      review: { type: String, required: true },
      reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Gig = mongoose.model<IGig>("Gig", GigSchema);
