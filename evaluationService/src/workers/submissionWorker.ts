import { Job, Worker } from "bullmq";
import { SUBMISSION_QUEUE } from "../utils/constants";
import { SubmissionJob } from "../jobs/submissionJob";
import redis from "../config/redis.config";

export const worker = (queueName: string) => {
  new Worker(
    queueName,
    async (job: Job) => {
      if (job.name == "SubmissionJob") {
        const submissionJob = new SubmissionJob(job.data);
        submissionJob.handle(job);
        return true;
      }
    },
    { connection: redis }
  );
};
