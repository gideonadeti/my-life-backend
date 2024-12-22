import { Request, Response } from "express";

import { readActivities } from "../../prisma/db";

export async function handleActivitiesGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
  }

  try {
    const activities = await readActivities(userId as string);

    res.json({ activities });
  } catch (err) {
    console.error("Something went wrong while reading activities:", err);

    res
      .status(500)
      .json({ errMsg: "Something went wrong while reading activities" });
  }
}
