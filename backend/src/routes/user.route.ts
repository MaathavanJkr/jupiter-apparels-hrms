import { Router } from 'express';
import { changePassword, createUser, deleteUser, getUserInfo, getUserInfoByID, getUserByID, getUsers, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/info/', getUserInfo);
router.get('/:id', getUserByID);
router.get('/info/:id', getUserInfoByID);
router.put('/:id', updateUser);
router.put('/change_password/:id',changePassword);
router.delete('/:id', deleteUser);

export default router;
