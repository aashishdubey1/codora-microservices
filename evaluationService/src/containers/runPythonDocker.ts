import type { TestCases } from "../types/testcases";
import { PYTHON_IMAGE } from "../utils/constants";
import { createContainer } from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";

export async function runPython(code: string, input?: string) {
  console.log("inside run python function");

  const rawLogBuffer: any[] = [];

  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "/bin/sh",
    "-c",
    `echo "${input}" | python3 -c "${code.replace(/"/g, '\\"')}"`,
  ]);

  await pythonDockerContainer.start();

  await new Promise((resolve) => setTimeout(resolve, 100));

  // Get logs with correct parameters
  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    follow: true,
    timestamps: false,
  });

  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
    console.log("Container output:", chunk.toString());
  });

  loggerStream.on("end", () => {
    console.log("Final logs:", rawLogBuffer);
    const completeBuffer = Buffer.concat(rawLogBuffer);
    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream);
  });

  loggerStream.on("error", (error) => {
    console.error("Log stream error:", error);
  });

  const result = await pythonDockerContainer.wait();
  console.log("Container finished with exit code:", result.StatusCode);

  await pythonDockerContainer.remove();

  return pythonDockerContainer;
}
