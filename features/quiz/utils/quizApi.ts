import axiosAPI from "@/axios/axiosApi";
import { AxiosError } from "axios";

export const generateQuiz = async (user_prompt: string) => {
  try {
    const response = await axiosAPI.post(
      `generate-quiz?user_prompt=${user_prompt}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Error generating quiz", error);
    throw error;
  }
};
