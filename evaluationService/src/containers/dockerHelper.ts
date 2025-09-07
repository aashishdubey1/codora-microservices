import type DockerStreamOutput from "../types/dockerStreamOutput";
import { HEADER_SIZE } from "../utils/constants";

export function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0; // keep track of current positon in the buffer

  const output: DockerStreamOutput = { stderr: "", stdout: "" };

  while (offset < buffer.length) {
    const channel = buffer[offset];

    offset += HEADER_SIZE;

    // this length variable hold the length of data frame/part of buffer where value is
    const length = buffer.readUint32BE(offset - 4);

    if (channel === 1) {
      //stdout stream
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    } else if (channel === 2) {
      //stderr stream
      output.stderr += buffer.toString("utf-8", offset, offset + length);
    }

    offset += length;
  }

  return output;
}
