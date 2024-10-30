// src/routes/leave.route.ts
import express from 'express';
import {
    createLeaveApplication,
    getLeaveApplicationsByEmployeeID,
    getLeaveApplicationByID, updateLeaveApplication,
    applyLeave,
    getMyLeaveApplications,
    getAllLeaveApplications,
    deleteLeaveApplication,
    getLeaveApplicationsForSupervisor
} from '../controllers/leaveapplication.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post("/", createLeaveApplication);
router.get("/", getAllLeaveApplications);
router.get("/:id", getLeaveApplicationByID);
router.put("/:id", updateLeaveApplication);
router.delete("/:id", deleteLeaveApplication);

router.get("/super/:id", getLeaveApplicationsForSupervisor);

// Leave application routes
router.post('/apply', userAuth, applyLeave); //get employee leaves by employee id
router.get('/my', userAuth, getMyLeaveApplications); 
router.get('/employee/:employee_id', getLeaveApplicationsByEmployeeID); //get employee leaves by employee id
router.get('/view/:application_id', getLeaveApplicationByID); // get a specific leave application for supervisor to view
router.put('/reject/:application_id', updateLeaveApplication); // reject leaves
router.put('/approve/:application_id', updateLeaveApplication); // approve leaves

export default router;
