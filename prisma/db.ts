import { PrismaClient } from "@prisma/client";

import colorGenerator from "../src/utils/color-generator";

const prismaClient = new PrismaClient();

export async function readGroups(userId: string) {
  try {
    const groups = await prismaClient.group.findMany({
      where: {
        userId,
      },
      include: {
        activities: true,
      },
    });

    if (groups.length === 0) {
      const group = await prismaClient.group.create({
        data: {
          userId: userId,
          name: "All Activities",
          isDefault: true,
          description: "",
          color: colorGenerator(),
        },
      });

      return [group];
    }

    return groups;
  } catch (err) {
    console.error("Error reading groups:", err);

    throw err;
  }
}

export async function readActivities(userId: string) {
  try {
    const activities = await prismaClient.activity.findMany({
      where: {
        userId,
      },
    });

    return activities;
  } catch (err) {
    console.error("Error reading activities:", err);

    throw err;
  }
}
