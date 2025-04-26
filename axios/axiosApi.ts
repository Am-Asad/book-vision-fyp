"use client";
import { store } from "@/store/store";
import { logoutUser } from "@/store/userSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const axiosAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return config;
  }

  const decodedToken = jwtDecode<{ exp: number }>(token);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    // Token expired
    toast.error("Session expired. Please log in again.");
    store.dispatch(logoutUser());
    window.location.href = "/signin";
    return Promise.reject("Token expired");
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosAPI;
