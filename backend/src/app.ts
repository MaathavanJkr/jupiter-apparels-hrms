// src/app.ts
import express from 'express';
import organizationRoutes from './routes/organization.route';
import userRoutes from './routes/user.route';

import emergencyContactRoutes from './routes/emergencyContact.route';
import employeeDependentRoutes from './routes/dependent.route';
import employmentStatusRoutes from './routes/employmentStatus.route';
import branchRoutes from './routes/branch.route';
import departmentRoutes from './routes/department.route';
import employeeRoutes from './routes/employee.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Settiing up Routes
app.use('/organization', organizationRoutes);
app.use('/user',userRoutes);
app.use('/branch', branchRoutes);
app.use('/department', departmentRoutes);
app.use('/employee', employeeRoutes);
app.use('/emergencycontact',emergencyContactRoutes);
app.use('/dependent',employeeDependentRoutes);
app.use('/employmentstatus',employmentStatusRoutes);


export default app;
