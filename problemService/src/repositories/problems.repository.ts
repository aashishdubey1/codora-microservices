import { Problem, type IProblem } from "../models/problem.model";

export interface IProblemRepo {
  createProblem(problem: Partial<IProblem>): Promise<IProblem>;
  getProblemById(id: string): Promise<IProblem | null>;
  getAllProblems(): Promise<{ problems: IProblem[]; total: number }>;
  updateProblem(
    id: string,
    updateData: Partial<IProblem>
  ): Promise<IProblem | null>;
  deleteProblem(id: string): Promise<IProblem | null>;
}

export class ProblemRepository implements IProblemRepo {
  constructor() {
    console.log("ProblemRepository constructor called");
  }

  async createProblem(problem: Partial<IProblem>): Promise<IProblem> {
    return await Problem.create(problem);
  }

  async getProblemById(id: string): Promise<IProblem | null> {
    return await Problem.findById(id);
  }

  async getAllProblems(): Promise<{ problems: IProblem[]; total: number }> {
    const [problems, total] = await Promise.all([
      Problem.find().sort({ createdAt: -1 }),
      Problem.countDocuments(),
    ]);
    return { problems, total };
  }

  async updateProblem(
    id: string,
    updateData: Partial<IProblem>
  ): Promise<IProblem | null> {
    return await Problem.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProblem(id: string): Promise<IProblem | null> {
    return await Problem.findByIdAndDelete(id);
  }
}
