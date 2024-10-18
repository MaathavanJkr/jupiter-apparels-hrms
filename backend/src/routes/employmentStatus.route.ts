import { Router } from 'express';
import { getEmploymentStatusByID } from '../controllers/employmentStatus.controller';

const router = Router();

router.get('/:id', getEmploymentStatusByID);

export default router;