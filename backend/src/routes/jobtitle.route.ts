// src/routes/index.ts
import { Router } from "express";
import {
  createJobTitle,
  getAllJobTitles,
  getJobTitleByID,
  deleteJobTitle,
  updateJobTitle,
} from "../controllers/jobtitle.controller";
import { adminAuth, userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", adminAuth, createJobTitle);
router.get("/", userAuth, getAllJobTitles);
router.get("/:id", userAuth, getJobTitleByID);
router.put("/:id", adminAuth, updateJobTitle);
router.delete("/:id", adminAuth, deleteJobTitle);

export default router;
