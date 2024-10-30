// src/routes/index.ts
import { Router } from "express";
import {
  createOrganization,
  deleteOrganization,
  getOrganizationByID,
  getAllOrganizations,
  updateOrganization,
} from "../controllers/organization.controller";
import { adminAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", adminAuth, createOrganization);
router.get("/", adminAuth, getAllOrganizations);
router.get("/:id", adminAuth, getOrganizationByID);
router.put("/:id", adminAuth, updateOrganization);
router.delete("/:id", adminAuth, deleteOrganization);

export default router;
