import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

// Exemplary usage (assumes there's a User model defined in the Prisma schema with an email field)
export async function readUser(email: string) {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error reading user:", error);

    throw error;
  }
}
