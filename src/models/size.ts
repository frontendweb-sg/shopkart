import mongoose, { Schema, Document } from "mongoose";
import { CATEGORY_TABLE } from "./category";
export const SIZE_TABLE = "size";

interface ISize {
  name: string;
  slug: string;
  parent: string;
  sizes: string[];
  active?: boolean;
}

export interface ISizeDoc extends Document<ISize>, ISize {
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: CATEGORY_TABLE, default: null },
    sizes: { type: [String] },
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

export const Size =
  mongoose.models[SIZE_TABLE] || mongoose.model<ISizeDoc>(SIZE_TABLE, schema);
