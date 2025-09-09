import { submissionQueue } from "../queues/submissionQueue";
import logger from "../config/logger.config";
import type { CreateSubmissionType } from "../types/submission";
import { SUBMISSION_QUEUE } from "../utils/constants";

export const addSubmissionJob = async (payload: CreateSubmissionType) => {
  await submissionQueue.add("SubmissionJob", payload);
  logger.info(
    `Job added to the Submission Queue  payload ${JSON.stringify(payload)}`
  );
};
