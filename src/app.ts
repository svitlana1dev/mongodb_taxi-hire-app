import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import routes from "./routes/drivers-routes";
import { serverErrorHandler } from "./middleware/server-error-handler";
require("dotenv").config();

const app = express();

const accessLogStream = createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});

app.use(morgan("combined", { stream: accessLogStream }));

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.DB);
}

app.use(bodyParser.json());

app.use("/api", routes);
app.use(serverErrorHandler);

export default app;
