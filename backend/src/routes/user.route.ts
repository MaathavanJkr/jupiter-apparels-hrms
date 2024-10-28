import { Router } from "express";
import {
  changePassword,
  createUser,
  deleteUser, getAllUsers,
  getUserByID,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.put("/:id", updateUser);
router.put("/change_password/:id", changePassword);
router.delete("/:id", deleteUser);


export default router;
