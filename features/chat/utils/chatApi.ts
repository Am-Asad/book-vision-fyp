import axiosAPI from "@/axios/axiosApi";
import { AxiosError } from "axios";

export const createChat = async (file: File, user_id: string) => {
  try {
    const response = await axiosAPI.post(
      "create-chat",
      { file, user_id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = response.data;
    console.log("Create chat data", data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Failed to create chat:", error);
    throw error;
  }
};

export const deleteChat = async (chat_id: string) => {
  try {
    const response = await axiosAPI.delete(`delete-chat/${chat_id}`);
    const data = response.data;
    console.log("Delete chat data", data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Error deleting chat", error);
    throw error;
  }
};

export const editChatTitle = async (chat_id: string, title: string) => {
  try {
    const response = await axiosAPI.put(`edit-chat/${chat_id}`, null, {
      params: { title },
    });
    const data = response.data;
    console.log("Edit chat title data", data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Error editing chat title", error);
    throw error;
  }
};

export const getChatsHistory = async (userId: string) => {
  try {
    const response = await axiosAPI.get(`user-chats/${userId}`);
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Error fetching chats history", error);
    throw error;
  }
};

export const getChatMessages = async (chat_id: string) => {
  try {
    const response = await axiosAPI.get(`/messages/${chat_id}`);
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Error fetching chat messages", error);
    throw error;
  }
};

export const sendMessage = async (
  chat_id: string,
  user_prompt: string,
  model: string
) => {
  let messageUrl = "";

  if (model === "OpenAI") {
    messageUrl = `open_ai_response?chat_id=${chat_id}&user_prompt=${user_prompt}`;
  } else if (model === "EnhancedOpenAI") {
    messageUrl = `enhanced_response_open_ai?chat_id=${chat_id}&user_prompt=${user_prompt}`;
  } else if (model === "Deepseek") {
    messageUrl = `deepseek_response?chat_id=${chat_id}&user_prompt=${user_prompt}`;
  } else if (model === "EnhancedDeepseek") {
    messageUrl = `enhanced_response_deepseek?chat_id=${chat_id}&user_prompt=${user_prompt}`;
  } else if (model === "DeepseekQ") {
    messageUrl = `deepseek_q_response?chat_id=${chat_id}&user_prompt=${user_prompt}`;
  } else if (model === "GeminiFlash") {
    messageUrl = `gemini_flash_response?chat_id=${chat_id}&user_prompt=${user_prompt}`;
  }

  try {
    const response = await axiosAPI.post(messageUrl);
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Error sending message", error);
    throw error;
  }
};
