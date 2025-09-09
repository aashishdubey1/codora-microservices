import { Queue } from "bullmq";
import { SUBMISSION_QUEUE } from "../utils/constants";

export const submissionQueue = new Queue(SUBMISSION_QUEUE);

const active = await submissionQueue.getActive();
console.log({ active: active.length });
const waiting = await submissionQueue.getWaiting();
console.log({ waiting: waiting.length });
const completed = await submissionQueue.getCompleted();
console.log({ completed: completed.length });
