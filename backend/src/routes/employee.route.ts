// src/routes/index.ts
import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeByID,
  updateEmployee,
  deleteEmployee,
  getFilteredEmployees,
} from "../controllers/employee.controller";

const router = Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.post("/search", getFilteredEmployees);
router.get("/:id", getEmployeeByID);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
