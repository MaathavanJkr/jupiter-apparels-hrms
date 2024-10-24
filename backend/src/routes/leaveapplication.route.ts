// src/routes/index.ts
import { Router } from "express";
import {
  createLeaveApplication,
  getAllLeaveApplications,
  getLeaveApplicationByID,
  updateLeaveApplication,
  deleteLeaveApplication,
  getLeaveApplicationsForSupervisor,
} from "../controllers/leaveapplication.controller";

const router = Router();

router.post("/", createLeaveApplication);
router.get("/", getAllLeaveApplications);
router.get("/:id", getLeaveApplicationByID);
router.put("/:id", updateLeaveApplication);
router.delete("/:id", deleteLeaveApplication);
router.get("/super/:id", getLeaveApplicationsForSupervisor);

export default router;