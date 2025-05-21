import axiosAPI from "@/axios/axiosApi";
import { AxiosError } from "axios";

export const createWebSearch = async (query: string) => {
  try {
    const response = await axiosAPI.post("search-with-images", null, {
      params: {
        query,
      },
      headers: {
        Accept: "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Failed to create web search:", error);
    throw error;
  }
};

export const getYoutubeSearch = async (query: string) => {
  try {
    const response = await axiosAPI.get("youtube-search", {
      params: {
        q: query,
        max_results: 5,
      },
      headers: {
        Accept: "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Failed to create web search:", error);
    throw error;
  }
};
