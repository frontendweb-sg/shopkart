import { NextResponse } from "next/server";
import { CustomError } from "../errors/custom-error";
import { devEnv } from "@/lib/devEnv";

export const errorHandler = (error: CustomError) => {
  devEnv(error.message);
  return NextResponse.json(
    { errors: error.renderError() },
    { status: error.status }
  );
};
