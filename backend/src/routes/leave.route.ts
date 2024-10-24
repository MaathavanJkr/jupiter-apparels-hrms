// src/routes/leave.route.ts
import express from 'express';
import {
    createLeaveApplication,
    getLeaveApplicationsByEmployeeID,
    getLeaveApplicationByID, updateLeaveApplication
} from '../controllers/leaveapplication.controller';

const router = express.Router();

// Leave application routes
router.post('/application/', createLeaveApplication); // Create a leave application
router.get('/employee/:employee_id', getLeaveApplicationsByEmployeeID); //get employee leaves by employee id
router.get('/view/:application_id', getLeaveApplicationByID); // get a specific leave application for supervisor to view
router.put('/reject/:application_id', updateLeaveApplication); // reject leaves
router.put('/approve/:application_id', updateLeaveApplication); // approve leaves


// router.get('/balance/:employee_id', getLeaveBalanceByID); // Get leave balance by employee ID
// router.get('/used/:employee_id', getUsedLeavesByID); // Get used leaves by employee ID
// router.get('/pending/:employee_id', getPendingLeavesByID); // Get pending leaves by employee ID
// router.get('/applications/:employee_id', getLeaveApplicationsByID); // Get leave applications by employee ID
// router.get('/latest/:employee_id', getLatestLeaveApplicationsByID); // Get latest leave applications by employee ID
// router.put('/approve/:application_id', approveLeave); // Approve a leave application
// router.put('/reject/:application_id', rejectLeave); // Reject a leave application

export default router;
