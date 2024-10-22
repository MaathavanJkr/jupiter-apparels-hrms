// src/routes/leave.route.ts
import express from 'express';
import {
    createLeaveApplication,

} from '../controllers/leaveapplication.controller'; // Import your leave controller functions

const router = express.Router();

// Leave application routes
router.post('/application/', createLeaveApplication); // Create a leave application
// router.get('/balance/:employee_id', getLeaveBalanceByID); // Get leave balance by employee ID
// router.get('/used/:employee_id', getUsedLeavesByID); // Get used leaves by employee ID
// router.get('/pending/:employee_id', getPendingLeavesByID); // Get pending leaves by employee ID
// router.get('/applications/:employee_id', getLeaveApplicationsByID); // Get leave applications by employee ID
// router.get('/latest/:employee_id', getLatestLeaveApplicationsByID); // Get latest leave applications by employee ID
// router.put('/approve/:application_id', approveLeave); // Approve a leave application
// router.put('/reject/:application_id', rejectLeave); // Reject a leave application

export default router;
