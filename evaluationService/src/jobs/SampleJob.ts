import type { Job } from "bullmq";
import type { IJob } from "../types/jobDefinations";

export class SampleJob implements IJob {
  name: string;
  payload?: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle(job: Job) {
    console.log("Inside Job handle");
    if (job) {
      console.log("this is the job", job.id);
    }
  }

  failed(job: Job): void {
    console.log("inside job reject handler");
    if (job) {
      console.log("This is inside reject", job.id);
    }
  }
}
