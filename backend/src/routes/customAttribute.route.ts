import { Router } from "express";


import {
  getCustomAttribute,
  getCustomAttributeByID,
} from "../controllers/customAttribute.controller";

const router = Router();

router.get("/", getCustomAttribute);
router.get("/:attribute_no", getCustomAttributeByID);

export default router;