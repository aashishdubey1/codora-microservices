import type { Job } from "bullmq";
import type { IJob } from "../types/submissionJob";

class SubmissionJob implements IJob {
  name: string;
  payload?: Record<string, unknown>;

  constructor(payload?: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle(job: Job) {
    console.log("Inside handle submission job");
  }

  failed(job: Job) {
    console.log("inside failed  submission job");
  }
}

export default SubmissionJob;
