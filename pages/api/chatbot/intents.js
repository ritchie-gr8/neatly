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
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `First, determine if the following message is in English.

          If the message is NOT in English, respond ONLY with "non_english".

          If the message IS in English, classify the user's intent from the message into exactly one of these categories:
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

    if (intent === "non_english") {
      res.status(200).json({ intent: "general inquiry" });
    } else {
      res.status(200).json({ intent });
    }
  } catch (error) {
    console.error("Error in intent classification:", error);
    res.status(500).json({ intent: "general inquiry" });
  }
}
