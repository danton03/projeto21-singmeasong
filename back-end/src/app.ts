import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import recommendationRouter from "./routers/recommendationRouter.js";
import testsRouter from "./routers/testsRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);
app.use(errorHandlerMiddleware);

if (process.env.ENVIRONMENT === "tests") {
	app.use(testsRouter);
}

export default app;
