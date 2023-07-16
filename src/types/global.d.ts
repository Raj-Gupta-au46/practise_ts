import { ROLE } from "./user";
import { Request } from "express";

export interface MIDDLEWARE_REQUEST_TYPE extends Request {
  payload?: {
    userId: string;
    role: ROLE;
    status: "ACTIVE" | "BLOCK";
  };
}
