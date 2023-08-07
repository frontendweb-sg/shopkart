import mongoose, { Schema, Document } from "mongoose";

export const CATEGORY_TABLE = "category";
export interface ICategory {
  name: string;
  slug: string;
  summary?: string;
  image?: string;
  active?: boolean;
}

export interface ICategoryDoc extends Document<ICategory>, ICategory {
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

export const Category =
  mongoose.models[CATEGORY_TABLE] ||
  mongoose.model<ICategoryDoc>(CATEGORY_TABLE, schema);
