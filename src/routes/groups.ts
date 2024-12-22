import { Router } from "express";

import { handleGroupsGet } from "../controllers/groups";

const router = Router();

router.get("/", handleGroupsGet);

export default router;