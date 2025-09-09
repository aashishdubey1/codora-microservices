import type { FastifyReply, FastifyRequest } from "fastify";
import type { SubmissionDataType } from "../validators/submission.validator";
import { addSubmissionJob } from "../producers/submissionProducer";

export class SubmissionController {
  async createSubmission(req: FastifyRequest, res: FastifyReply) {
    const submissionData = req.body as SubmissionDataType;

    console.log({ submissionData });

    const newSubmission = await req.server.submissionRepository.create(
      submissionData
    );

    if (!newSubmission) {
      return res.status(500).send({ error: "Error while creating submission" });
    }

    addSubmissionJob(submissionData);

    res
      .code(201)
      .send({ success: true, msg: "Submission Added", data: submissionData });
  }
}
