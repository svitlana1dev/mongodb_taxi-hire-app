import express from "express";
import { NextFunction, type Request, type Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import routes from "./routes/routes";
require("dotenv").config();

const app = express();


mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.DB);
}

app.use(bodyParser.json());

app.use("/api", routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    message: err.message || "error",
  })
})

export default app;
