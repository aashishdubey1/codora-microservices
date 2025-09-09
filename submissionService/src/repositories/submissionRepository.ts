import fp from "fastify-plugin";
import {
  Submission,
  type ISubmission,
  type ISubmissionData,
  type SubmissionStatus,
} from "../models/submission.model";
import type { FastifyInstance } from "fastify";

interface ISubmissionRepository {
  create(submissionData: Partial<ISubmission>): Promise<ISubmission>;
  findById(id: string): Promise<ISubmission | null>;
  findByProblemId(problemId: string): Promise<ISubmission[]>;
  deleteById(id: string): Promise<boolean>;
  updateStatus(
    id: string,
    status: SubmissionStatus,
    submissionData: ISubmissionData
  ): Promise<ISubmission | null>;
}

class SubmissionRepository implements ISubmissionRepository {
  async create(submissionData: Partial<ISubmission>): Promise<ISubmission> {
    console.log("inside repos", { submissionData });
    const newSubmission = await Submission.create(submissionData);
    return newSubmission;
  }

  async findById(id: string): Promise<ISubmission | null> {
    const submission = await Submission.findById(id);
    return submission;
  }

  async findByProblemId(problemId: string): Promise<ISubmission[]> {
    const submissions = await Submission.find({ problemId });
    return submissions;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await Submission.findByIdAndDelete(id);
    return result !== null;
  }

  async updateStatus(
    id: string,
    status: SubmissionStatus,
    submissionData: ISubmissionData
  ): Promise<ISubmission | null> {
    const submission = await Submission.findByIdAndUpdate(
      id,
      { status, submissionData },
      { new: true }
    );
    return submission;
  }
}

async function submissionRepository(fastify: FastifyInstance) {
  const repo = new SubmissionRepository();
  fastify.decorate("submissionRepository", repo);
}

export default fp(submissionRepository);

declare module "fastify" {
  interface FastifyInstance {
    submissionRepository: SubmissionRepository;
  }
}
