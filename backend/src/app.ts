// src/app.ts
import express from 'express';
import organizationRoutes from './routes/organization.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Settiing up Routes
app.use('/organization', organizationRoutes);

export default app;