import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    console.log(req);
    await db.bedType.create({
      data: {
        bedDescription: "test",
      },
    });
    console.log("created");

    const bedType = await db.bedType.findMany();
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
