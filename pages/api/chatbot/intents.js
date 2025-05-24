import { GoogleGenAI } from "@google/genai";
import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    // Fetch all topics from the ChatbotResponses table
    const chatbotResponses = await db.chatbotResponse.findMany({
      select: {
        topic: true,
      },
    });

    // Extract topics from the responses
    let topics = chatbotResponses.map((response) =>
      response.topic.toLowerCase()
    );

    // Ensure we always have a general inquiry option
    if (!topics.includes("general inquiry")) {
      topics.push("general inquiry");
    }

    // Remove duplicates if any
    topics = [...new Set(topics)];

    // Format topics for the prompt
    const formattedTopics = topics
      .map((topic) => `          - ${topic}`)
      .join("\n");

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
          ${formattedTopics}

          Respond with ONLY the category name, no explanation or additional text.

          User message: "${message}"`,
          },
        ],
      },
    ];

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
    console.error("Error in intent classification:", error);
    res.status(500).json({ intent: "general inquiry" });
  }
}
