import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxlength: 100,
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
      maxlength: 100,
    },
    expectedSalary: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (v) {
          return typeof v === "number" || v === "unspecified";
        },
        message: "Expected salary must be a number or 'unspecified'",
      },
      default: "unspecified",
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
// Middleware to handle expectedSalary before saving or updating
function handleExpectedSalary(job) {
  if (
    job.expectedSalary === undefined ||
    job.expectedSalary === null ||
    job.expectedSalary === "" ||
    isNaN(job.expectedSalary)
  ) {
    // If expectedSalary is invalid, set it to "unspecified"
    job.expectedSalary = "unspecified";
  } else {
    job.expectedSalary = Number(job.expectedSalary);
  }
}

JobSchema.pre("save", function (next) {
  handleExpectedSalary(this);
  next();
});
// Handle expectedSalary on findOneAndUpdate
JobSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.expectedSalary !== undefined) {
    handleExpectedSalary(update);
  }
  next();
});

export default mongoose.model("Job", JobSchema);
