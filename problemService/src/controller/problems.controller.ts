import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { ProblemRepository } from "../repositories/problems.repository";
import { ProblemService } from "../services/problem.service";
import type { UpdateProblemDto } from "../validators/problem.validatior";

const problemService = new ProblemService(new ProblemRepository());

export class ProblemController {
  async addProblem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const problem = await problemService.createProblem(req.body);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Problem added",
        data: problem,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProblemById(
    req: Request<{ id: string }, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const problem = await problemService.getProblemById(req.params.id);

      if (!problem) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Problem not found",
          data: problem,
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Problem fetched successfully",
        data: problem,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProblem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const problems = await problemService.getAllProblems();

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Problem fetched successfully",
        data: problems,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProblem(
    req: Request<{ id: string }, {}, UpdateProblemDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = req.params.id;
    const body = req.body;

    try {
      const updatedProblem = await problemService.udpateProblem(id, body);

      if (!updatedProblem) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Problem not found",
          data: updatedProblem,
        });
        return;
      }

      res.status(200).json({
        message: "Problem updated successfully",
        data: updatedProblem,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProblem(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const problem = await problemService.deleteProblem(req.params.id);

    if (!problem) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Problem not found",
        data: problem,
      });
      return;
    }

    res.status(200).json({
      message: "Problem deleted successfully",
      data: problem,
      success: true,
    });
  }
}
