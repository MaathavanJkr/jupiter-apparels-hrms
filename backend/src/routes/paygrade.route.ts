import { Router } from "express";
import {
  createPayGrade,
  getAllPayGrade,
  getPayGradeByID,
  updatePayGrade,
  deletePayGrade,
} from "../controllers/paygrade.controller";
const router = Router();

router.post("/", createPayGrade);
router.get("/", getAllPayGrade);
router.get("/:id", getPayGradeByID);
router.put("/:id", updatePayGrade);
router.delete("/:id", deletePayGrade);

export default router;
