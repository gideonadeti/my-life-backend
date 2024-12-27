import { Router } from "express";

import {
  handleActivitiesGet,
  handleActivitiesPost,
} from "../controllers/activities";

const router = Router();

router.post("/", handleActivitiesPost);
router.get("/", handleActivitiesGet);

export default router;
