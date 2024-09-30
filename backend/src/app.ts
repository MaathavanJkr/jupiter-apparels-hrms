// src/app.ts
import express from 'express';
import organizationRoutes from './routes/organization.route';
import branchRoutes from './routes/branch.route';
import departmentRoutes from "./routes/department.route";
import employeeRoutes from "./routes/employee.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting up Routes
app.use('/organization', organizationRoutes);
app.use('/branch', branchRoutes);
app.use('/department', departmentRoutes);
app.use('/employee', employeeRoutes);

export default app;