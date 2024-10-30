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
  getEmployeeIdByUserId,
  getAllUniqueSupervisors,
  findSupervisors,
  getEmployeeCountByDepartmentID,
  getEmployeeGenderCounts,
} from "../controllers/employee.controller";
import { getEmployeeBasicInfoByUserID } from "../controllers/employeeBasicInfoView.controller";
import { managerAuth, userAuth, adminAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", managerAuth, createEmployee);
router.get("/", managerAuth, getAllEmployees);
router.post("/search", managerAuth, getFilteredEmployees);
router.post("/search/count", managerAuth, getFilteredCount);
router.post("/supervisors",managerAuth,  findSupervisors);
router.get("/:id", userAuth, getEmployeeByID);
router.put("/:id", managerAuth, updateEmployee);
router.delete("/:id", managerAuth, deleteEmployee);
router.get("/supervisor/employees/:supervisor_id",userAuth,  getEmployeesUnderSupervisor);
router.get("/user/:user_id/employee", userAuth, getEmployeeIdByUserId);
router.get("/supervisor/", userAuth, getAllUniqueSupervisors);
router.get("/count/department/", adminAuth, getEmployeeCountByDepartmentID);
router.get("/count/employee/", adminAuth, getEmployeeGenderCounts);

router.get("/info/:user_id", getEmployeeBasicInfoByUserID);

export default router;
