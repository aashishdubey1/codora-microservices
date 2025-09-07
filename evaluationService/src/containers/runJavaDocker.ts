import type { TestCases } from "../types/testcases";
import { JAVA_IMAGE, PYTHON_IMAGE } from "../utils/constants";
import { createContainer } from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";

export async function runJava(code: string, input?: string) {
  console.log("inside run Java function");

  const rawLogBuffer: any[] = [];

  const javaDockerContainer = await createContainer(JAVA_IMAGE, [
    "/bin/sh",
    "-c",
    `echo "${input}" | (echo '${code.replace(
      /'/g,
      "'\\''"
    )}' > Main.java && javac Main.java && java Main)`,
  ]);

  await javaDockerContainer.start();

  await new Promise((resolve) => setTimeout(resolve, 100));

  // Get logs with correct parameters
  const loggerStream = await javaDockerContainer.logs({
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

  const result = await javaDockerContainer.wait();
  console.log("Container finished with exit code:", result.StatusCode);

  await javaDockerContainer.remove();

  return javaDockerContainer;
}
