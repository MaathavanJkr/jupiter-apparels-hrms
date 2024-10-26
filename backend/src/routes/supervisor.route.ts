// src/routes/index.ts
import { Router } from "express";
import { getAllSupervisorID } from "../controllers/supervisor.controller";

const router = Router();

router.get("/allsuperid", getAllSupervisorID);

export default router;
