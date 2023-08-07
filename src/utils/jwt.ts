import { AuthError } from "@/errors/auth-error";
import JWT, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AppContent } from "./content";

export interface JwtOptions extends SignOptions {}
export const DEFAULT_OPTIONS: JwtOptions = {
  expiresIn: "1h",
};

interface JwtPayloadExtends extends JwtPayload {
  email: string;
  id: string;
}
export class Jwt {
  static genToken(payload: JwtPayload, options: JwtOptions = DEFAULT_OPTIONS) {
    return JWT.sign(payload, process.env.NEXTAUTH_SECRET!, options);
  }

  static verifyToken(token: string) {
    return JWT.verify(
      token,
      process.env.NEXTAUTH_SECRET!,
      function cb(error, decode) {
        if (error) throw new AuthError(AppContent.authExpiredText);
        return decode as JwtPayloadExtends;
      }
    );
  }
}
