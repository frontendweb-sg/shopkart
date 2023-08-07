import mongoose, { Schema, Document } from "mongoose";

export const COLOR_TABLE = "color";
interface IColor {
  name: string;
  slug: string;
  summary?: string;
  image?: string;
  active?: boolean;
}

export interface IColorDoc extends Document<IColor>, IColor {
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

export const Color =
  mongoose.models[COLOR_TABLE] ||
  mongoose.model<IColorDoc>(COLOR_TABLE, schema);
