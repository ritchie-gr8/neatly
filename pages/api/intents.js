import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const { message } = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const config = { responseMimeType: "text/plain" };
  const model = "gemini-2.0-flash-lite";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Classify the user's intent from the following message into exactly one of these categories:
          - room types
          - booking
          - check-in & check-out time
          - payment
          - promotion
          - general inquiry

          Respond with ONLY the category name, no explanation or additional text.

          User message: "${message}"`,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    const intent =
      response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
      "general inquiry";
    res.status(200).json({ intent });
  } catch (error) {
    console.error("Error getting user intent:", error);
    res.status(500).json({ intent: "general inquiry" });
  }
}
