import { Router } from "express";

import {getUsedLeavesByEmployeeID} from "../controllers/usedLeavesView.controller";
const router = Router();

router.get("/:id", getUsedLeavesByEmployeeID);

export default router;
