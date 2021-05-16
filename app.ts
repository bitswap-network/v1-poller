import express from "express";
import cors from "cors";
import helmet from "helmet";

import * as middleware from "./utils/middleware";
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const config = require("./utils/config");
const app: express.Application = express();
mongoose
  .connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });
app.use(middleware.requestLogger);
app.use(cors());
app.use(helmet()); //security
app.use(express.json());
app.use(middleware.errorHandler);

// API Routes Here
app.get("/", (req, res) => {
  res.status(200).send(`BitSwap Polling API`);
});
export default app;
