import { Router } from "express";
import {
  createEmployeeDependent,
  deleteEmployeeDependent,
  getEmployeeDependentByEmployeeID,
  getEmployeeDependentByID,
  getAllEmployeeDependents,
  updateEmployeeDependent,
} from "../controllers/dependent.controllers";
import { adminAuth, managerAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", adminAuth, createEmployeeDependent);
router.get("/", managerAuth, getAllEmployeeDependents);
router.get("/:id", managerAuth, getEmployeeDependentByID);
router.get("/employee/:employee_id", managerAuth, getEmployeeDependentByEmployeeID);
router.put("/:id", managerAuth, updateEmployeeDependent);
router.delete("/:id", managerAuth, deleteEmployeeDependent);

export default router;
