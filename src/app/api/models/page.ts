import mongoose, { Schema, Document } from "mongoose";
export const PAGE_TABLE = "page";

export enum Status {
  publish = "publish",
  pending = "pending",
  preview = "preview",
  private = "private",
}
export interface IContent {
  name: string;
  summary: string;
  image: string;
  active?: boolean;
  sections?: IContent[] | null;
}

export interface IPage {
  name: string;
  slug: string;
  hero: string;
  link: string;
  summary: string;
  excerpt?: string;
  order?: number;
  contents?: IContent[] | null;
  status?: Status;
  active?: boolean;
}

export interface IPageDoc extends Document<IPage>, IPage {
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    hero: { type: String, default: "" },
    link: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    summary: { type: String, default: "" },
    contents: [
      {
        name: { type: String, required: true },
        image: { type: String },
        summary: { type: String, default: "" },
        active: { type: Boolean, default: true },
        sections: [
          {
            name: { type: String, required: true },
            image: { type: String },
            summary: { type: String, default: "" },
            active: { type: Boolean, default: true },
          },
        ],
      },
    ],
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

export const Page =
  mongoose.models[PAGE_TABLE] || mongoose.model<IPageDoc>(PAGE_TABLE, schema);
