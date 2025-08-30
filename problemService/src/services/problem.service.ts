import type { IProblem } from "../models/problem.model";
import type { IProblemRepo } from "../repositories/problems.repository";
import type {
  CreateProblemDto,
  UpdateProblemDto,
} from "../validators/problem.validatior";

export interface IProblemService {
  createProblem(problem: CreateProblemDto): Promise<IProblem>;
  getProblemById(id: string): Promise<IProblem | null>;
  getAllProblems(): Promise<{ problems: IProblem[]; total: number }>;
  udpateProblem(
    id: string,
    updateData: UpdateProblemDto
  ): Promise<IProblem | null>;
  deleteProblem(id: string): Promise<IProblem | null>;
}

export class ProblemService implements IProblemService {
  constructor(private repository: IProblemRepo) {
    this.repository = repository;
  }

  async createProblem(problem: CreateProblemDto): Promise<IProblem> {
    return this.repository.createProblem(problem);
  }

  async getAllProblems(): Promise<{ problems: IProblem[]; total: number }> {
    return this.repository.getAllProblems();
  }

  async getProblemById(id: string): Promise<IProblem | null> {
    return this.repository.getProblemById(id);
  }

  async udpateProblem(
    id: string,
    updateData: UpdateProblemDto
  ): Promise<IProblem | null> {
    return this.repository.updateProblem(id, updateData);
  }

  async deleteProblem(id: string): Promise<IProblem | null> {
    return await this.repository.deleteProblem(id);
  }
}
