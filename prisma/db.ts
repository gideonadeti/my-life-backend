import { PrismaClient } from "@prisma/client";

import colorGenerator from "../src/utils/color-generator";

const prismaClient = new PrismaClient();

export async function createGroup(
  userId: string,
  name: string,
  description: string,
  color: string
) {
  try {
    await prismaClient.group.create({
      data: {
        userId,
        name,
        description,
        color,
      },
    });
  } catch (err) {
    console.error("Error creating group:", err);

    throw err;
  }
}

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

export async function readGroup(userId: string, name: string) {
  try {
    const group = await prismaClient.group.findFirst({
      where: {
        userId,
        name,
      },
    });

    return group;
  } catch (err) {
    console.error("Error reading group:", err);

    throw err;
  }
}

export async function createActivity(
  userId: string,
  groupId: string,
  name: string,
  description: string,
  color: string,
  days: string[],
  expectedTimes: { start: string; end: string }[]
) {
  try {
    await prismaClient.activity.create({
      data: {
        userId,
        groupId,
        name,
        description,
        color,
        days,
        expectedTimes,
      },
    });
  } catch (err) {
    console.error("Error creating activity:", err);

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

export async function readActivity(
  userId: string,
  groupId: string,
  name: string
) {
  try {
    const activity = await prismaClient.activity.findFirst({
      where: {
        userId,
        groupId,
        name,
      },
    });

    return activity;
  } catch (err) {
    console.error("Error reading activity:", err);

    throw err;
  }
}
