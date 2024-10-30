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
import {
  getAllPendingLeaveApplications,
  getPendingLeaveApplicationById,
  getPendingLeaveCountByEmployeeId,
} from "../controllers/pendingLeaveApplicationsView.controller";

const router = Router();

// Leave application routes
router.post("/", createLeaveApplication);
router.get("/", getAllLeaveApplications);
router.get("/:id", getLeaveApplicationByID);
router.put("/:id", updateLeaveApplication);
router.delete("/:id", deleteLeaveApplication);
router.get("/super/:id", getLeaveApplicationsForSupervisor);

// Pending leave application routes
router.get("/pending-leaves", getAllPendingLeaveApplications);
router.get("/pending-leaves/:id", getPendingLeaveApplicationById);
router.get("/pending-leaves/count/:emp_id", getPendingLeaveCountByEmployeeId);

export default router;
