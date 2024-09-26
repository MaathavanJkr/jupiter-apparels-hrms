// src/routes/index.ts
import { Router } from 'express';
import { createBranch, getBranches, getBranchByID, updateBranch, deleteBranch } from '../controllers/branch.controller';

const router = Router();

router.post('/', createBranch);
router.get('/', getBranches);
router.get('/:id', getBranchByID);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

export default router;
