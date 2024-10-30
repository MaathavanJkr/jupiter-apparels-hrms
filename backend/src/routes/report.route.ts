// src/routes/index.ts
import { Router } from "express";
import {
  getEmployeesByDepartment,
  getReportByGroup,
  getTotalLeavesByDepartmentForPeriod,
  getReportByCustomAttribute
} from "../controllers/report.controller";

const router = Router();

router.get("/employee/dept/:id", getEmployeesByDepartment);
router.get("/totalleaves", getTotalLeavesByDepartmentForPeriod);
router.get("/employee", getReportByGroup);
router.post("/custom", getReportByCustomAttribute);

export default router;

