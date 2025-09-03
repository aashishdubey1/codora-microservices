import type { NextFunction, Request, Response } from "express";
import type { CreateSubmissionType } from "../types/submission";
import { StatusCodes } from "http-status-codes";

export async function addSubmission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const submissionData = req.body as CreateSubmissionType;
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Success submission",
    data: submissionData,
  });
}
