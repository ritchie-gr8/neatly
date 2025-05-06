import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("upload route called");
  if (req.method !== "POST") {
    console.log("Method not allowed");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ message: "Error parsing form" });
    }

    const { image } = files;
    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    try {
      const result = await cloudinary.uploader.upload(image[0].filepath);
      console.log(result)
      return res.status(200).json({ url: result.secure_url, public_id: result.public_id });
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({
        message: "Error uploading image",
        error: error.message,
      });
    }
  });
}
