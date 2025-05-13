import { PrismaClient } from "@/lib/generated/prisma/client";

declare global {
  var prismaClientInstance: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({});
} else {
  if (!globalThis.prismaClientInstance) {
    console.log("Development: Creating new PrismaClient instance.");
    globalThis.prismaClientInstance = new PrismaClient({});
  }
  prisma = globalThis.prismaClientInstance;
}

if (process.env.NODE_ENV === "development") {
  const exitHandlerSymbol = Symbol.for("prismaExitHandlerAttached");

  if (!globalThis[exitHandlerSymbol]) {
    process.on("beforeExit", async () => {
      console.log(
        "Prisma client disconnecting via beforeExit hook (development)..."
      );
      if (globalThis.prismaClientInstance) {
        await globalThis.prismaClientInstance.$disconnect();
        console.log("Prisma client disconnected.");
      }
    });
    globalThis[exitHandlerSymbol] = true;
  }
}

export const db = prisma;
