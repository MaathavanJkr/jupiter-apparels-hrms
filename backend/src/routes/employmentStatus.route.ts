import { Router } from "express";
import {
  getAllEmploymentStatuses,
  getEmploymentStatusByID,
} from "../controllers/employmentStatus.controller";
import { userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userAuth, getAllEmploymentStatuses);
router.get("/:id", userAuth, getEmploymentStatusByID);

export default router;
