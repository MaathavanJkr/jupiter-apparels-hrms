// src/routes/index.ts
import { Router } from "express";
import {
  createBranch,
  getAllBranches,
  getBranchByID,
  updateBranch,
  deleteBranch,
} from "../controllers/branch.controller";
import { adminAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", adminAuth, createBranch);
router.get("/", adminAuth, getAllBranches);
router.get("/:id", adminAuth, getBranchByID);
router.put("/:id", adminAuth, updateBranch);
router.delete("/:id", adminAuth, deleteBranch);

export default router;
