import { submissionQueue } from "../queue/submissionQueue";

export async function addSubmissionJob(payload: Record<string, unknown>) {
  await submissionQueue.add("SubmissionJob", payload);
  console.log("Job added to submission queue");
}
