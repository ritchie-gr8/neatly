import api from "@/lib/axios";

/**
 * Fetches the appropriate bot response for a given topic
 * @param {string} topic - The topic to get a response for
 * @returns {Promise<object|null>} - The structured bot response or null if no response is found
 */
const getBotResponseForTopic = async (topic) => {
  try {
    // Normalize the topic
    const normalizedTopic = topic.trim().toLowerCase();

    // Fetch response from API
    const { data } = await api.get(`/chatbot/response/${encodeURIComponent(normalizedTopic)}`);

    if (data && data.success) {
      console.log("Bot Response:", data);

      // Return the structured response data directly
      // This allows the frontend to render different UI based on the response type
      return data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return null;
  }
};

export default getBotResponseForTopic;
