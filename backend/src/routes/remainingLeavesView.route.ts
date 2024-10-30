import { Router } from "express";
import {
  getAllRemainingLeaves,
  getRemainingLeavesByEmployeeID,
    getRemainingLeavesByCategory,
} from "../controllers/remainingLeavesView.controller";
import { userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userAuth, getAllRemainingLeaves);
router.get("/:id", userAuth, getRemainingLeavesByEmployeeID);
router.get("/:id/leaves/:category", userAuth, getRemainingLeavesByCategory);

export default router;
