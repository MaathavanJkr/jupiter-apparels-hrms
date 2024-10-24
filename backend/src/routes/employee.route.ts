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
  getEmployeesUnderSupervisor,
  getEmployeeIdByUserId, getAllUniqueSupervisors,

} from "../controllers/employee.controller";

const router = Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.post("/search", getFilteredEmployees);
router.post("/search/count", getFilteredCount);
router.get("/:id", getEmployeeByID);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/supervisor/employees/:supervisor_id",getEmployeesUnderSupervisor);
router.get('/user/:user_id/employee', getEmployeeIdByUserId);
router.get('/supervisor/',getAllUniqueSupervisors);


export default router;
