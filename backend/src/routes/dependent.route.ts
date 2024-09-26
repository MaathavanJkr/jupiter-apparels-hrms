import { Router } from 'express';
import { createEmployeeDependent, deleteEmployeeDependent, getEmployeeDependentByEmployeeID, getEmployeeDependentByID, getEmployeeDependents, updateEmployeeDependent } from '../controllers/dependent.controllers';

const router = Router();

router.post('/', createEmployeeDependent);
router.get('/', getEmployeeDependents);
router.get('/:id', getEmployeeDependentByID);
router.get('/employee/:employee_id',getEmployeeDependentByEmployeeID);
router.put('/:id', updateEmployeeDependent);
router.delete('/:id', deleteEmployeeDependent);

export default router;