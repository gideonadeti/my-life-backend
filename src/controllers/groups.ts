import { Request, Response } from "express";

import { readGroups } from "../../prisma/db";
import { getCache, setCache } from "../lib/cache";

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
