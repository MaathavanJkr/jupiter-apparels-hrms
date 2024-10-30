import { Router } from "express";
import {
  getAllRemainingLeaves,
  getRemainingLeavesByEmployeeID,
    getRemainingLeavesByCategory,
} from "../controllers/remainingLeavesView.controller";

const router = Router();

router.get("/", getAllRemainingLeaves);
router.get("/:id", getRemainingLeavesByEmployeeID);
router.get("/:id/leaves/:category", getRemainingLeavesByCategory);

export default router;
