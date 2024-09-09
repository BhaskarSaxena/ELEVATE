import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  gig: mongoose.Types.ObjectId;
  client: mongoose.Types.ObjectId;
  freelancer: mongoose.Types.ObjectId;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  gig: { type: Schema.Types.ObjectId, ref: 'Gig', required: true },
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  freelancer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  price: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
