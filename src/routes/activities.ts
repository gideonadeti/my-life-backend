import { Router } from "express";

import { handleActivitiesGet } from "../controllers/activities";

const router = Router();

router.get("/", handleActivitiesGet);

export default router;
