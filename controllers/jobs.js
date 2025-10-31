import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
const createJob = async (req, res) => {
  if (!req.body.company || !req.body.position) {
    throw new BadRequestError("Please provide both company and position");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    "-createdAt"
  );

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId });
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  // check if request body is empty
  if (!Object.keys(req.body).length) {
    throw new BadRequestError("Please provide data to update");
  }
  // check for empty strings in the request body
  for (const key in req.body) {
    if (typeof req.body[key] === "string" && req.body[key].trim() === "") {
      throw new BadRequestError(`${key} field cannot be empty`);
    }
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: req.user.userId,
  });
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
};

export { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
