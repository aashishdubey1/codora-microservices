import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateSchema =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("validating schema");
    const result = schema.safeParse(req.body);
    console.log(req.body);
    console.log(result);
    if (!result.success) {
      return res
        .status(404)
        .json({ success: false, err: result.error.issues[0]?.message });
    }
    req.body = result.data;
    next();
  };
