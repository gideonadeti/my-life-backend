import { Request, Response } from "express";

import { readGroups } from "../../prisma/db";

export async function handleGroupsGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
  }

  try {
    const groups = await readGroups(userId as string);

    res.json({ groups });
  } catch (err) {
    console.error("Something went wrong while reading groups:", err);

    res
      .status(500)
      .json({ errMsg: "Something went wrong while reading groups" });
  }
}
