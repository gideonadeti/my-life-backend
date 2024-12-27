import { Router } from "express";

import { handleGroupsGet, handleGroupsPost } from "../controllers/groups";

const router = Router();

router.post("/", handleGroupsPost);
router.get("/", handleGroupsGet);

export default router;
