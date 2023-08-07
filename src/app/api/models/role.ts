import mongoose, { Schema, Document } from "mongoose";
export const ROLE_TABLE = "role";
interface IRole {
  name: string;
  slug: string;
  permission: string[];
  active?: boolean;
}

export interface IRoleDoc extends Document<IRole>, IRole {
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    permission: {
      type: [String],
      enum: ["r", "w", "u", "d"],
      default: ["r"],
      validate: function (value: string) {
        return Array.isArray(value);
      },
    },
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
export const Role =
  mongoose.models[ROLE_TABLE] || mongoose.model<IRoleDoc>(ROLE_TABLE, schema);
