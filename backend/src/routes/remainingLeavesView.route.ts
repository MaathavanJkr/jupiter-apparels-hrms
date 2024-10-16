import { Router } from 'express';
import {
    getAllRemainingLeaves,
    getRemainingLeavesByEmployeeID
} from '../controllers/remainingLeavesView.controller';

const router = Router();

router.get('/', getAllRemainingLeaves);
router.get('/:id', getRemainingLeavesByEmployeeID);

export default router;
