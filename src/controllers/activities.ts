import { Request, Response } from "express";

import { readActivities, readActivity, createActivity } from "../../prisma/db";
import { getCache, setCache, clearCache } from "../lib/cache";

export async function handleActivitiesPost(req: Request, res: Response) {
  const { userId } = req.query;
  const { groupId, name, description, color, expectedTimes } = req.body;

  if (!userId || !groupId || !name || !color || !expectedTimes) {
    return res.status(400).json({
      errMsg: "userId, groupId, name, color, and expectedTimes are required",
    });
  }

  try {
    const activity = await readActivity(
      userId as string,
      groupId as string,
      name.trim()
    );

    if (activity) {
      return res.status(400).json({ errMsg: "Activity already exists" });
    }

    await createActivity(
      userId as string,
      groupId as string,
      name.trim(),
      description.trim(),
      color,
      expectedTimes
    );
    await clearCache(`/activities?userId=${userId}`);
    await clearCache(`/groups?userId=${userId}`);

    res.json({ msg: "Activity created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating activity" });
  }
}

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
