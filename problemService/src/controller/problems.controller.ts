import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export class ProblemController {
  async addProblem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async getProblemById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async getAllProblem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async updateProblem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async deleteProblem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
