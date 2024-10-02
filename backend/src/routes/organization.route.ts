// src/routes/index.ts
import { Router } from 'express';
import { createOrganization, deleteOrganization, getOrganizationByID, getAllOrganizations, updateOrganization } from '../controllers/organization.controller';

const router = Router();

router.post('/', createOrganization);
router.get('/', getAllOrganizations);
router.get('/:id', getOrganizationByID);
router.put('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);

export default router;
