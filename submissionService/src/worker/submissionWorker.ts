import { Job, Worker } from "bullmq";
import SubmissionJob from "../jobs/submissionJob";

async function worker(queueName: string) {
  new Worker(queueName, async (job: Job) => {
    if (job.name === "submissionJob") {
      const submissionJob = new SubmissionJob(job.data);
      submissionJob.handle(job);
      return true;
    }
  });
}

export default worker;
