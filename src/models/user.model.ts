import { model, Model, Schema } from "mongoose";
import { USER_TYPE } from "../types";
import { PasswordHashService } from "../services";

const userSchema = new Schema<USER_TYPE, Model<USER_TYPE>>(
  {
    role: {
      type: String,
      enum: {
        values: ["SUPER-ADMIN", "ADMIN", "READER"],
        message: "Role must be SUPER-ADMIN, ADMIN or READER",
      },
      default: "READER",
    },

    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },

    email: {
      unique: true,
      type: String,
      index: true,
      required: [true, "Email is required"],
      trim: true,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpiresAt: {
      type: Number,
    },

    password: {
      type: String,
      select: false,
    },

    profilePath: {
      type: String,
    },

    profileUrl: {
      type: String,
    },

    slug: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK"],
      default: "ACTIVE",
    },

    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = model<USER_TYPE, Model<USER_TYPE>>("User", userSchema);
UserSchema.syncIndexes();
export default UserSchema;
