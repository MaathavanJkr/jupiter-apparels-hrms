import { Router } from 'express';
import { createUser, deleteUser, getUserByID, getUsers, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserByID);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
