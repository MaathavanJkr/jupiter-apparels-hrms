// src/routes/index.ts
import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeByID,
  updateEmployee,
  deleteEmployee,
  getFilteredEmployees,
  getFilteredCount,
} from "../controllers/employee.controller";
import { getEmployeeBasicInfoByUserID } from "../controllers/employeeBasicInfoView.controller";

const router = Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.post("/search", getFilteredEmployees);
router.post("/search/count", getFilteredCount);
router.get("/:id", getEmployeeByID);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

router.get("/info/:user_id", getEmployeeBasicInfoByUserID)

export default router;
