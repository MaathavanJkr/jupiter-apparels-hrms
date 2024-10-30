// src/routes/index.ts
import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentByID,
  updateDepartment,
  deleteDepartment,
  getEmployeeCountByDepartmentID,
} from "../controllers/department.controller";
import { adminAuth, userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", adminAuth, createDepartment);
router.get("/", userAuth, getAllDepartments);
router.get("/:id", userAuth, getDepartmentByID);
router.put("/:id", adminAuth, updateDepartment);
router.delete("/:id", adminAuth, deleteDepartment);
router.get("/empcount/:id", userAuth, getEmployeeCountByDepartmentID);

export default router;
