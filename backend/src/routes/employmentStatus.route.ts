import { Router } from 'express';
import { createEmploymentStatus, deleteEmploymentStatus, getEmploymentStatusByID, getEmploymentStatuses, updateEmploymentStatus } from '../controllers/employmentStatus.controller';

const router = Router();

router.post('/', createEmploymentStatus);
router.get('/', getEmploymentStatuses);
router.get('/:id', getEmploymentStatusByID);
router.put('/:id', updateEmploymentStatus);
router.delete('/:id', deleteEmploymentStatus);

export default router;