// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      throw err;
    });
};

const CorsOptions = {
  Credentials: true,
  ///..other Options
};

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//res.cookie(...)
app.use(cookieParser());

//res.json({.....})
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    // satus: status,
    // message: message
    status,
    message,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Connected to server port:${PORT}`);
});
