import type { Job } from "bullmq";
import type { IJob } from "../types/jobDefinations";
import type { CreateSubmissionType } from "../types/submission";
import { runPython } from "../containers/runPythonDocker";
import { runCpp } from "../containers/runCppDocker";
import { runJava } from "../containers/runJavaDocker";

export class SubmissionJob implements IJob {
  name: string;
  payload?: CreateSubmissionType;
  constructor(payload?: CreateSubmissionType) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  handle(job: Job) {
    console.log("Handeling submission job", job.data);
    const jobData = job.data as CreateSubmissionType;
    switch (jobData.language) {
      case "python":
        runPython(jobData.code);
        break;
      case "cpp":
        runCpp(jobData.code);
        break;
      case "java":
        runJava(jobData.code);
        break;
      default:
        console.log("unexpected code lang ");
    }
  }

  failed(job: Job) {
    console.log("Failed submission job");
  }
}
