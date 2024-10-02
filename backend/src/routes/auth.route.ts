// src/routes/index.ts
import { Router } from 'express';
import { loginUser } from '../controllers/0auth.controller';

const router = Router();

router.post('/login', loginUser);

export default router;
