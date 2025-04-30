import { PrismaClient } from "@/lib/generated/prisma/index";

export default async function handler(req, res) {
  try {
    console.log(req);
    const prisma = new PrismaClient();
    await prisma.bedType.create({
      data: {
        bedDescription: "test",
      },
    });
    console.log("created");

    const bedType = await prisma.bedType.findMany();
    console.log("found");

    res.status(200).json({
      data: {
        bedType,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
}
