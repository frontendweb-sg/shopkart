import { AuthError } from "@/errors/auth-error";
import { CustomError } from "@/errors/custom-error";
import { ValidationError } from "@/errors/validation-error";
import { connectDb } from "@/lib/db";
import { errorHandler } from "@/middleware/error-handler";
import { User } from "@/models/user";
import { AppContent } from "@/utils/content";
import { Jwt } from "@/utils/jwt";
import { Password } from "@/utils/password";
import { Error } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * User signin
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const body = (await req.json()) as { email: string; password: string };

    const user = await User.findOne({
      $or: [{ email: body.email }, { mobile: body.email }],
    });

    if (!user) throw new AuthError(AppContent.usernotFoundText);

    const verify = Password.compare(body.password, user?.password!);
    if (!verify) throw new AuthError(AppContent.invalidPasswordText);

    const token = Jwt.genToken({ email: user.email, id: user.id });
    const doc = {
      ...user.toJSON(),
      accessToken: token,
    };

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      error = new ValidationError(error);
    }
    return errorHandler(error as CustomError);
  }
}
