import { Router } from "express";
import {
  createEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContactByEmployeeID,
  getEmergencyContactByID,
  getAllEmergencyContacts,
  updateEmergencyContact,
} from "../controllers/emergencyContact.controller";
import { managerAuth, userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", managerAuth, createEmergencyContact);
router.get("/", managerAuth, getAllEmergencyContacts);
router.get("/:id", managerAuth, getEmergencyContactByID);
router.get("/employee/:employee_id", userAuth, getEmergencyContactByEmployeeID);
router.put("/:id", managerAuth, updateEmergencyContact);
router.delete("/:id", managerAuth, deleteEmergencyContact);

export default router;
