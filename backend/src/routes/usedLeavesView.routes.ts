import { Router } from "express";

import {getUsedLeavesByEmployeeID} from "../controllers/usedLeavesView.controller";
import { userAuth } from "../middlewares/auth.middleware";
const router = Router();

router.get("/:id", userAuth, getUsedLeavesByEmployeeID);

export default router;
