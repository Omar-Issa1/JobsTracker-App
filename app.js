import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import "express-async-errors";
// extra security packages
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import rateLimiter from "express-rate-limit";
// connectDB

import connectDB from "./db/connect.js";
import authenticateUser from "./middleware/authentication.js";
// routes
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
// extra packages
app.use(helmet());
app.use(xss());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/", (req, res) => {
  res.send("Jobs API");
});
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
