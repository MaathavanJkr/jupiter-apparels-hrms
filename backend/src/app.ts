// src/app.ts
import express from 'express';
import cors from 'cors';

import organizationRoutes from './routes/organization.route';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route'
import emergencyContactRoutes from './routes/emergencyContact.route';
import employeeDependentRoutes from './routes/dependent.route';
import employmentStatusRoutes from './routes/employmentStatus.route';
import branchRoutes from './routes/branch.route';
import departmentRoutes from './routes/department.route';
import employeeRoutes from './routes/employee.route';
import jobtitleRoutes from './routes/jobtitle.route';
import paygradeRoutes from './routes/paygrade.route';
import remainingLeavesViewRoute from "./routes/remainingLeavesView.route";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//Settiing up Routes
app.use('/auth', authRoutes);
app.use('/organization', organizationRoutes);
app.use('/user',userRoutes);
app.use('/branch', branchRoutes);
app.use('/department', departmentRoutes);
app.use('/employee', employeeRoutes);
app.use('/emergencycontact',emergencyContactRoutes);
app.use('/dependent',employeeDependentRoutes);
app.use('/employmentstatus',employmentStatusRoutes);
app.use('/jobtitle',jobtitleRoutes);
app.use('/paygrade',paygradeRoutes);
app.use('/remainingLeavesView', remainingLeavesViewRoute);


export default app;
