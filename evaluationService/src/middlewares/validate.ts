import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodType, type ZodAny } from "zod";

export const validate =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: result.error.issues[0]?.message });
    }
    req.body = result.data;
    next();
  };
