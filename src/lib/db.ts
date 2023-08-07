import mongoose from "mongoose";
import { devEnv } from "./devEnv";

const MONGODB_URI = process.env.MONGODB_URL!;

console.log(MONGODB_URI);
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

const connectDb = async () => {
  if (cached.conn) {
    devEnv("Database old instance");
    return cached.conn;
  }

  if (cached.conn) return cached.conn;

  try {
    cached.conn = await mongoose.connect(MONGODB_URI);
    devEnv("Database connected!");
    return cached.conn;
  } catch (error) {
    console.log(error);
  }
};

export { connectDb };
