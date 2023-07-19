import { Document } from "mongoose";

export type ROLE = "SUPER-ADMIN" | "ADMIN" | "READER";

export default interface USER_TYPE extends Document {
  role: ROLE;
  name: string;
  email: string;
  verificationToken: string | undefined;
  verificationTokenExpiresAt: number | undefined;
  password?: string;
  profileUrl?: string;
  profilePath?: string;
  slug?: string;
  status: "ACTIVE" | "BLOCK";
  isVerified: boolean;
}
