import mongoose, { Schema, Document } from "mongoose";

export const USER_TABLE = "user";
export interface IAddress {
  address_1: string;
  address_2: string;
  landmark: string;
  country: string;
  city: string;
  zip: string;
  mobile: string;
  active?: boolean;
}

export interface IUserPayments {
  payment_type: string;
  provider: string;
  account_no: string;
  card_no: string;
  card_expiry: string;
  upi_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICart {
  product: string;
  total: number;
  qty: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  mobile: string;
  active?: boolean;
  role: string;
  verify: boolean;
  resetToken: string | null;
  address: null | IAddress[];
  payments: IUserPayments[];
  cart: ICart[];
}
export interface IUserDoc extends Document<IUser>, IUser {
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    role: { type: String, default: "user", enum: ["admin", "user", "vendor"] },
    verify: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    active: { type: Boolean, default: true },
    address: [
      {
        address_1: { type: String, required: true },
        address_2: { type: String, required: true },
        landmark: { type: String, default: "" },
        country: { type: String, default: "" },
        city: { type: String, required: true },
        zip: { type: String, default: "" },
        mobile: { type: String, required: true },
        active: { type: Boolean, default: true },
      },
    ],
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

export const User =
  mongoose.models[USER_TABLE] || mongoose.model<IUserDoc>(USER_TABLE, schema);
