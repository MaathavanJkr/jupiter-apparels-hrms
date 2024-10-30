import { Router } from "express";

import {
  getCustomAttribute,
  getCustomAttributeByID,
  updateCustomAttributeByID,
} from "../controllers/customAttribute.controller";

const router = Router();

router.get("/", getCustomAttribute);
router.get("/:attribute_no", getCustomAttributeByID);
router.put("/:attribute_no", updateCustomAttributeByID);

export default router;
