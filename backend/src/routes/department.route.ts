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

const router = Router();

router.post("/", createDepartment);
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentByID);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);
router.get("/empcount/:id", getEmployeeCountByDepartmentID);

export default router;
