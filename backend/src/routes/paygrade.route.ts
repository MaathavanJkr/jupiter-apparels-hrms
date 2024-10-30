import { Router } from "express";
import {
  createPayGrade,
  getAllPayGrade,
  getPayGradeByID,
  updatePayGrade,
  deletePayGrade,
} from "../controllers/paygrade.controller";
import { adminAuth, userAuth } from "../middlewares/auth.middleware";
const router = Router();

router.post("/", adminAuth, createPayGrade);
router.get("/", userAuth, getAllPayGrade);
router.get("/:id", userAuth, getPayGradeByID);
router.put("/:id", adminAuth, updatePayGrade);
router.delete("/:id", adminAuth, deletePayGrade);

export default router;
