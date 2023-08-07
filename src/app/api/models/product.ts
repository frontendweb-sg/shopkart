import mongoose, { Schema, Document } from "mongoose";
import { Status } from "./page";

export const CATEGORY_TABLE = "category";
export interface ProductAttributes {
  name: string;
  value: string;
}
export interface IProduct {
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  sellingPrice: number;
  discount: number;
  images?: string[];
  summary?: string;
  sizes: string[];
  colors: string[];
  idle_for: string;
  coupon?: string;
  isNew: boolean;
  quantity: number;
  attributes?: ProductAttributes[];
  active?: boolean;
  status?: Status;
}
