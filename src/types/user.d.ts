import { Document } from "mongoose";

export type ROLE = "SUPER-ADMIN" | "ADMIN" | "READER";

export default interface USER_TYPE extends Document {
  role: ROLE;
  name: string;
  email: string;
  verificationToken: string | undefined;
  verificationTokenExpiresAt: number | undefined;
  country?: string;
  profession?: string;
  expertiseInSubjects?: string[];
  yearOfExperience?: number;
  portfolioLink?: string;
  about?: string;
  designation?: string;
  password?: string;
  profileUrl?: string;
  profilePath?: string;
  slug?: string;
  status: "ACTIVE" | "BLOCK";
  isVerified: boolean;
  followers: USER_TYPE[];
  following: USER_TYPE[];
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
