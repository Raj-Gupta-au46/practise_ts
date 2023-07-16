import { Request } from "express";
import { validationResult } from "express-validator";
import { BadRequest } from "http-errors";

export const fieldValidateError = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequest(
      errors
        .array()
        .map((errors) => errors.msg)
        .join()
        .replace(/[,]/g, " and ")
    );
  }
};
