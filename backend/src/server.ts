import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes";
import projectRouter from "./routes/projectRoutes";
import taskRouter from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // toto nám dovoluje parsovat příchozí request req.body
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL!)
  // .connect('mongodb://0.0.0.0:27017/managementApp')
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
