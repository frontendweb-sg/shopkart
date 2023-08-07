import mongoose, { Schema, Document } from "mongoose";

export const COUPON_TABLE = "coupon";
export interface ICoupon {
  code: string;
  summary?: string;
  discount: number;
  discount_type: string;
  times_used: number;
  max_usage: number;
  coupon_start_date: Date | null;
  coupon_end_date: Date | null;
  active?: boolean;
}

export interface ICouponDoc extends Document<ICoupon>, ICoupon {
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    code: { type: String, required: true },
    summary: { type: String, required: true },
    discount: { type: String, default: "" },
    discount_type: { type: String },
    times_used: { type: String, default: 0 },
    max_usage: { type: String, default: 0 },
    coupon_start_date: { type: String, default: null },
    coupon_end_date: { type: String, default: null },
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

export const Coupon =
  mongoose.models[COUPON_TABLE] ||
  mongoose.model<ICouponDoc>(COUPON_TABLE, schema);
