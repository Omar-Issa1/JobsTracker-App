const createJob = (req, res) => {
  res.send("create job route");
};
const getAllJobs = (req, res) => {
  res.send("get all jobs route");
};
const getSingleJob = (req, res) => {
  res.send("get single job route");
};
const updateJob = (req, res) => {
  res.send("update job route");
};
const deleteJob = (req, res) => {
  res.send("delete job route");
};

export { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
