import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function reset(req: Request, res: Response) {
	await testService.resetDatabase();
	res.sendStatus(200);
}

export async function populate(req: Request, res: Response) {
	await testService.populateDatabase();
	res.sendStatus(200);
}