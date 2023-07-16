import { NextFunction, Response } from "express";
import { JwtService } from "../services";
import { MIDDLEWARE_REQUEST_TYPE } from "../types/global";
import { Unauthorized, Locked } from "http-errors";
import { UserSchema } from "../models/";

export default class ProtectedMiddleware extends JwtService {
  public async protected(
    req: MIDDLEWARE_REQUEST_TYPE,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers["authorization"]) throw new Unauthorized("Unauthorized");
      const token = req?.headers?.["authorization"].split(" ")[1];
      if (!token) throw new Unauthorized("Unauthorized");
      const payload = super.accessTokenVerify(token);
      if (!payload?.audience) throw new Unauthorized("Unauthorized");
      let userObj = JSON.parse(payload.audience);
      console.log(userObj);
      if (!userObj.userId) throw new Unauthorized("Unauthorized");
      const user = await UserSchema.findById(userObj.userId).select("status");
      if (!user) throw new Unauthorized("Unauthorized");
      if (user.status !== "ACTIVE")
        throw new Locked("You are blocked by your higher authority..");
      req.payload = userObj;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async isAdmin(
    req: MIDDLEWARE_REQUEST_TYPE,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers["authorization"]) throw new Unauthorized("Unauthorized");
      const token = req?.headers?.["authorization"].split(" ")[1];
      if (!token) throw new Unauthorized("Unauthorized");
      const payload = super.accessTokenVerify(token);
      if (!payload?.audience) throw new Unauthorized("Unauthorized");
      let userObj = JSON.parse(payload.audience);
      if (!userObj.userId) throw new Unauthorized("Unauthorized");
      const user = await UserSchema.findById(userObj.userId).select("status");
      if (!user) throw new Unauthorized("Unauthorized");

      if (user.role !== "ADMIN")
        throw new Unauthorized("You are not authorized to perform this action");

      if (user.status !== "ACTIVE")
        throw new Locked("You are blocked by your higher authority..");
      req.payload = userObj;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async isSuperAdmin(
    req: MIDDLEWARE_REQUEST_TYPE,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers["authorization"]) throw new Unauthorized("Unauthorized");
      const token = req?.headers?.["authorization"].split(" ")[1];
      if (!token) throw new Unauthorized("Unauthorized");
      const payload = super.accessTokenVerify(token);
      if (!payload?.audience) throw new Unauthorized("Unauthorized");
      let userObj = JSON.parse(payload.audience);
      if (!userObj.userId) throw new Unauthorized("Unauthorized");
      const user = await UserSchema.findById(userObj.userId).select("status");
      if (!user) throw new Unauthorized("Unauthorized");

      if (user.role !== "SUPER-ADMIN")
        throw new Unauthorized("You are not authorized to perform this action");

      if (user.status !== "ACTIVE")
        throw new Locked("You are blocked by your higher authority..");
      req.payload = userObj;
      next();
    } catch (error) {
      next(error);
    }
  }
}
