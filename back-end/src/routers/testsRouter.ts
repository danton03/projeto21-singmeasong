import { Router } from "express";
import { reset, populate } from "../controllers/testsController";

const testsRouter = Router();

testsRouter.post("/resetdb", reset);
testsRouter.post("/seed/recommendations", populate);

export default testsRouter;