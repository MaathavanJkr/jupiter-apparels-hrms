import { Router } from 'express';
import { createEmergencyContact, deleteEmergencyContact, getEmergencyContactByEmployeeID, getEmergencyContactByID, getEmergencyContacts, updateEmergencyContact } from '../controllers/emergencyContact.controller';

const router = Router();

router.post('/', createEmergencyContact);
router.get('/', getEmergencyContacts);
router.get('/:id', getEmergencyContactByID);
router.get('/employee/:employee_id',getEmergencyContactByEmployeeID);
router.put('/:id', updateEmergencyContact);
router.delete('/:id', deleteEmergencyContact);

export default router;