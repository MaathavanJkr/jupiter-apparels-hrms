import { Router } from "express";
import {
  changePassword,
  createUser,
  deleteUser, getAllUsers,
  getUserByID,
  updateUser,
} from "../controllers/user.controller";
import { managerAuth, userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", managerAuth, createUser);
router.get("/", managerAuth, getAllUsers);
router.get("/:id", managerAuth, getUserByID);
router.put("/:id", managerAuth, updateUser);
router.put("/change_password/:id", userAuth, changePassword);
router.delete("/:id", managerAuth, deleteUser);


export default router;
