// src/routes/index.ts
import { Router } from "express";
import { getAllSupervisorID } from "../controllers/supervisor.controller";
import { userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/allsuperid", userAuth, getAllSupervisorID);

export default router;
