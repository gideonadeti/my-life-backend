import { Request, Response } from "express";

import { readActivities } from "../../prisma/db";
import { getCache, setCache } from "../lib/cache";

export async function handleActivitiesGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
  }

  try {
    const cachedActivities = await getCache(`/activities?userId=${userId}`);

    if (cachedActivities) {
      return res.json({ activities: cachedActivities });
    }

    const activities = await readActivities(userId as string);

    await setCache(`/activities?userId=${userId}`, activities);

    res.json({ activities });
  } catch (err) {
    console.error("Something went wrong while reading activities:", err);

    res
      .status(500)
      .json({ errMsg: "Something went wrong while reading activities" });
  }
}
