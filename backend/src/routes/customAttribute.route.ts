import { Router } from "express";


import {
  getCustomAttribute,
  getCustomAttributeByID,
} from "../controllers/customAttribute.controller";
import { userAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userAuth, getCustomAttribute);
router.get("/:attribute_no", userAuth, getCustomAttributeByID);

export default router;