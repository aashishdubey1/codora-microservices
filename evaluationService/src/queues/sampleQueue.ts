import { Queue } from "bullmq";

export const sampleQueue = new Queue("sampleQueue");

// const active = await sampleQueue.getActive();
// console.log({ active: active.length });
// const waiting = await sampleQueue.getWaiting();
// console.log({ waiting: waiting.length });
// const completed = await sampleQueue.getCompleted();
// console.log({ completed: completed.length });
