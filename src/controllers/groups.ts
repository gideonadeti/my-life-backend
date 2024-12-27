import { Request, Response } from "express";

import { readGroups, readGroup, createGroup } from "../../prisma/db";
import { getCache, setCache, clearCache } from "../lib/cache";

export async function handleGroupsPost(req: Request, res: Response) {
  const { userId } = req.query;
  const { name, description, color } = req.body;

  if (!userId || !name || !color) {
    return res
      .status(400)
      .json({ errMsg: "userId, name, and color are required" });
  }

  try {
    const group = await readGroup(userId as string, name.trim());

    if (group) {
      return res.status(400).json({ errMsg: "Group already exists" });
    }

    await createGroup(userId as string, name.trim(), description.trim(), color);
    await clearCache(`/groups?userId=${userId}`);

    res.json({ msg: "Group created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating group" });
  }
}

export async function handleGroupsGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
  }

  try {
    const cachedGroups = await getCache(`/groups?userId=${userId}`);

    if (cachedGroups) {
      return res.json({ groups: cachedGroups });
    }

    const groups = await readGroups(userId as string);

    await setCache(`/groups?userId=${userId}`, groups);

    res.json({ groups });
  } catch (err) {
    console.error("Something went wrong while reading groups:", err);

    res
      .status(500)
      .json({ errMsg: "Something went wrong while reading groups" });
  }
}
