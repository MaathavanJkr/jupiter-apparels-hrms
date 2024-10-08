// src/routes/index.ts
import { Router } from 'express';
import { createJobTitle, getJobTitle, getJobTitleByID, deleteJobTitle, updateJobTitle } from '../controllers/jobtitle.controller';

const router = Router();

router.post('/',createJobTitle);
router.get('/',getJobTitle);
router.get('/:id',getJobTitleByID);
router.put('/:id',updateJobTitle);
router.delete('/:id',deleteJobTitle);


export default router;
