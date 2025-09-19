import { useChat } from "../context/ChatContext";
import {
  generateMessageId,
  createUserMessage,
  createAgentMessage,
} from "../utils/messageUtils";

const WEATHER_API_CONFIG = {
  endpoint:
    "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
  headers: {
    "Accept": "*/*",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "x-mastra-dev-playground": "true",
  },
};

export function useWeatherApi() {
  const { addMessage, setLoading, setError } = useChat();

  const sendMessage = async (userMessage) => {
    try {
      setError(null);
      setLoading(true);

      const userMessageObj = createUserMessage(userMessage);
      addMessage(userMessageObj);

      const requestBody = {
        messages: [
          {
            role: "user",
            content: userMessage
          },
        ],
        runId: "weatherAgent",
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId: 2,
        resourceId: "weatherAgent",
      };

      const response = await fetch(WEATHER_API_CONFIG.endpoint, {
        method: "POST",
        headers: WEATHER_API_CONFIG.headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      /*
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";
      let agentMessageId = generateMessageId();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                accumulatedResponse += data.content;
                const agentMessage = createAgentMessage(accumulatedResponse, agentMessageId);
                addMessage(agentMessage);
              }
            } catch (parseError) {
              console.warn('Failed to parse streaming data:', parseError);
            }
          }
        }

        // for (const line of lines) {
        //   if (!line.trim()) continue;

        //   try {
        //     // Some APIs send `data: {...}`, others send raw JSON
        //     const cleanLine = line.startsWith("data: ") ? line.slice(6) : line;

        //     const data = JSON.parse(cleanLine);

        //     // Handle token-style responses
        //     if (data.content) {
        //       accumulatedResponse += data.content;
        //     } else if (typeof data[0] === "string") {
        //       accumulatedResponse += data[0];
        //     }

        //     if (accumulatedResponse) {
        //       const agentMessage = createAgentMessage(
        //         accumulatedResponse,
        //         agentMessageId
        //       );
        //       addMessage(agentMessage);
        //     }
        //   } catch (parseError) {
        //     console.warn("Failed to parse streaming data:", line, parseError);
        //   }
        // }

      }

      */

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";
      let agentMessageId = generateMessageId();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
        
            const [prefix, json] = line.split(/:(.+)/); 
            if (!json) continue;

            if (prefix === "0") {
         
              accumulatedResponse += JSON.parse(json); 
              const agentMessage = createAgentMessage(
                accumulatedResponse,
                agentMessageId
              );
              addMessage(agentMessage);
            }

            if (prefix === "a") {
    
              const data = JSON.parse(json);
              console.log("Tool result:", data);

              const weatherInfo = data.result;
              if (weatherInfo) {
                const structuredMessage =
                  `🌤️ Weather in ${weatherInfo.location}:\n` +
                  `Temperature: ${weatherInfo.temperature}°C (feels like ${weatherInfo.feelsLike}°C)\n` +
                  `Humidity: ${weatherInfo.humidity}%\n` +
                  `Wind: ${weatherInfo.windSpeed} km/h (gusts up to ${weatherInfo.windGust} km/h)\n` +
                  `Conditions: ${weatherInfo.conditions}`;

                const agentMessage = createAgentMessage(
                  structuredMessage,
                  agentMessageId
                );
                addMessage(agentMessage);
              }
            }

          } catch (err) {
            console.warn("Failed to parse line:", line, err);
          }
        }
      }

      if (accumulatedResponse.trim()) {
        const finalMessage = createAgentMessage(
          accumulatedResponse,
          agentMessageId
        );
        finalMessage.status = "delivered";
        addMessage(finalMessage);

        setTimeout(() => {
          finalMessage.status = "read";
          addMessage({ ...finalMessage });
        }, 1500);
      } else {
        throw new Error("No response received from weather agent");
      }
    } catch (error) {
      console.error("Weather API Error:", error);
      let errorMessage = "Failed to get weather information. ";

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage += "Please check your internet connection.";
      } else if (error.message.includes("404")) {
        errorMessage += "Weather service is currently unavailable.";
      } else if (error.message.includes("500")) {
        errorMessage += "Weather service is experiencing issues.";
      } else {
        errorMessage += error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage };
}
