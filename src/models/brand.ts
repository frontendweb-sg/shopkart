import mongoose, { Schema, Document } from "mongoose";

export const BRAND_TABLE = "brand";
export interface IBrand {
  name: string;
  slug: string;
  image?: string;
  summary?: string;
  active?: boolean;
}
export interface ICategoryDoc extends Document<IBrand>, IBrand {
  createdAt?: Date;
  updatedAt?: Date;
}

// brand schema
const schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
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

export const Brand =
  mongoose.models[BRAND_TABLE] ||
  mongoose.model<ICategoryDoc>(BRAND_TABLE, schema);
