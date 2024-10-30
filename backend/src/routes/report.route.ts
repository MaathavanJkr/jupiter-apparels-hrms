// src/routes/index.ts
import { Router } from "express";
import {
  getEmployeesByDepartment,
  getReportByGroup,
  getTotalLeavesByDepartmentForPeriod,
  getReportByCustomAttribute
} from "../controllers/report.controller";
import { managerAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/employee/dept/:id", managerAuth, getEmployeesByDepartment);
router.get("/totalleaves", managerAuth, getTotalLeavesByDepartmentForPeriod);
router.get("/employee", managerAuth, getReportByGroup);
router.post("/custom", managerAuth, getReportByCustomAttribute);

export default router;

