import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ message: "Error parsing form" });
    }

    const { image } = files;
    const { folder } = fields;

    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    try {
      const uploadOptions = {};

      if (folder) {
        uploadOptions.folder = folder[0];
      }

      const result = await cloudinary.uploader.upload(image[0].filepath, uploadOptions);
      return res.status(200).json({ url: result.secure_url, public_id: result.public_id });
    } catch (error) {
      console.error("Error uploading image:", error.message);
      return res.status(500).json({
        message: "Error uploading image",
        error: error.message,
      });
    }
  });
}
