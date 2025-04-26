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
    console.log("chat messages", data);
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
  user_id: string,
  user_prompt: string
) => {
  try {
    const response = await axiosAPI.post(
      `/getresponse?chat_id=${chat_id}&user_id=${user_id}&user_prompt=${user_prompt}`
    );
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
