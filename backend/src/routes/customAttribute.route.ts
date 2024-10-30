import { Router } from "express";

import {
  getCustomAttribute,
  getCustomAttributeByID,
  updateCustomAttributeByID,
} from "../controllers/customAttribute.controller";
import { adminAuth, userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userAuth, getCustomAttribute);
router.get("/:attribute_no", userAuth, getCustomAttributeByID);
router.put("/:attribute_no", adminAuth, updateCustomAttributeByID);

export default router;
