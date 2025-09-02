import { Worker, type Job } from "bullmq";
import { SampleJob } from "../jobs/SampleJob";
import redis from "../config/redis.config";

export default function sampleWorker(queneName: string) {
  new Worker(
    queneName,
    async (job: Job) => {
      if (job.name == "sampleJob") {
        const sampleJob = new SampleJob(job.data);
        sampleJob.handle(job);
        return true;
      }
    },
    { connection: redis }
  );
}
