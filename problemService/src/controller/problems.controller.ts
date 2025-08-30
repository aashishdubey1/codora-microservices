import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { ProblemRepository } from "../repositories/problems.repository";
import { ProblemService } from "../services/problem.service";

const problemService = new ProblemService(new ProblemRepository());

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
