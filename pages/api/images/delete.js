import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { public_id } = req.body;
  if (!public_id) {
    return res.status(400).json({ message: "No public_id provided" });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return res.status(200).json({ message: "Image deleted successfully", result });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({ message: "Error deleting image" });
  }
}
