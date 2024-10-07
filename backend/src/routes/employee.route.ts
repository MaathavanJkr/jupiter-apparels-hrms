// src/routes/index.ts
import { Router } from 'express';
import { createEmployee, getEmployees, getEmployeeByID, updateEmployee, deleteEmployee, getSupervisors } from '../controllers/employee.controller';

const router = Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeByID);
router.get('/supervisor/',getSupervisors);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
