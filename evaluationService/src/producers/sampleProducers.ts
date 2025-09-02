import logger from "../config/logger.config";
import { sampleQueue } from "../queues/sampleQueue";

export async function addJob(name: string, payload: Record<string, unknown>) {
  await sampleQueue.add(name, payload);
  logger.info(`Job added ${name}  ${JSON.stringify(payload)}`);
}
