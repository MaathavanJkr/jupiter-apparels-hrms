// src/routes/index.ts
import { Router } from "express";
import {
  createBranch,
  getAllBranches,
  getBranchByID,
  updateBranch,
  deleteBranch,
} from "../controllers/branch.controller";

const router = Router();

router.post("/", createBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranchByID);
router.put("/:id", updateBranch);
router.delete("/:id", deleteBranch);

export default router;
