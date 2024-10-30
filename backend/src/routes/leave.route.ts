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
import { adminAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post("/", adminAuth, createLeaveApplication);
router.get("/", adminAuth, getAllLeaveApplications);
router.get("/:id", adminAuth, getLeaveApplicationByID);
router.put("/:id", adminAuth, updateLeaveApplication);
router.delete("/:id", adminAuth, deleteLeaveApplication);

router.get("/super/:id", userAuth, getLeaveApplicationsForSupervisor);

// Leave application routes
router.post('/apply', userAuth, applyLeave); //get employee leaves by employee id
router.get('/my', userAuth, getMyLeaveApplications); 
router.get('/employee/:employee_id', userAuth, getLeaveApplicationsByEmployeeID); //get employee leaves by employee id
router.get('/view/:application_id', userAuth, getLeaveApplicationByID); // get a specific leave application for supervisor to view
router.put('/reject/:application_id', userAuth, updateLeaveApplication); // reject leaves
router.put('/approve/:application_id', userAuth, updateLeaveApplication); // approve leaves

export default router;
