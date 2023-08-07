import mongoose, { Schema, Document } from "mongoose";

export const ORDER_TABLE = "order";
export interface IOrder {
  user: string;
  coupon: string;
  order_status: string;
  order_approved_at: Date;
  order_delivered_customer_date: Date;
  active?: boolean;
}

export interface IOrderDoc extends Document<IOrder>, IOrder {
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, default: "" },
    summary: { type: String, default: "" },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Order =
  mongoose.models[ORDER_TABLE] ||
  mongoose.model<IOrderDoc>(ORDER_TABLE, schema);
