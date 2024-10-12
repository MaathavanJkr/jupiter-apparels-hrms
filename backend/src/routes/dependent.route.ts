import { Router } from 'express';
import { createEmployeeDependent, deleteEmployeeDependent, getEmployeeDependentByEmployeeID, getEmployeeDependentByID, getAllEmployeeDependents, updateEmployeeDependent } from '../controllers/dependent.controllers';

const router = Router();

router.post('/', createEmployeeDependent);
router.get('/', getAllEmployeeDependents);
router.get('/:id', getEmployeeDependentByID);
router.get('/employee/:employee_id',getEmployeeDependentByEmployeeID);
router.put('/:id', updateEmployeeDependent);
router.delete('/:id', deleteEmployeeDependent);

export default router;