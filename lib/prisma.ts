import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;

  if (process.env.NODE_ENV === "development") {
    process.on("beforeExit", async () => {
      await prisma.$disconnect();
    });
  }
}

export const db = prisma;
