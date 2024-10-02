// src/routes/index.ts
import { Router } from 'express';
import { login } from '../controllers/0auth.controller';

const router = Router();

router.post('/login', login);

export default router;
