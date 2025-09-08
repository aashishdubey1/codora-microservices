import { CPP_IMAGE } from "../utils/constants";
import { createContainer } from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";

export async function runCpp(code: string, input?: string) {
  console.log("inside run Java function");

  const rawLogBuffer: any[] = [];

  const cppDockerContainer = await createContainer(CPP_IMAGE, [
    "/bin/sh",
    "-c",
    `echo "${input}" | (echo '${code}' > main.cpp && g++ -o main main.cpp && stdbuf -oL -eL ./main)`,
  ]);

  await cppDockerContainer.start();

  await new Promise((resolve) => setTimeout(resolve, 100));

  // Get logs with correct parameters
  const loggerStream = await cppDockerContainer.logs({
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

  const result = await cppDockerContainer.wait();
  console.log("Container finished with exit code:", result.StatusCode);

  await cppDockerContainer.remove();

  return cppDockerContainer;
}
