import { Router } from 'express';
import { getAllEmploymentStatuses, getEmploymentStatusByID } from '../controllers/employmentStatus.controller';

const router = Router();

router.get('/', getAllEmploymentStatuses);
router.get('/:id', getEmploymentStatusByID);

export default router;