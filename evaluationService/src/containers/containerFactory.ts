import Docker from "dockerode";

export async function createContainer(
  imageName: string,
  cmdExecutable: string[]
) {
  const docker = new Docker({
    host: "127.0.0.1",
    port: 2375,
  });
  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    OpenStdin: true,
  });

  console.log("New container intialized");

  return container;
}
