import axiosAPI from "@/axios/axiosApi";
import { AxiosError } from "axios";

export const signup = async (email: string, password: string) => {
  try {
    const response = await axiosAPI.post("/signup", { email, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Failed to signup:", error);
    throw error;
  }
};

export const signin = async (username: string, password: string) => {
  try {
    const response = await axiosAPI.post(
      "/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Failed to signin:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosAPI.get("/me");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};
