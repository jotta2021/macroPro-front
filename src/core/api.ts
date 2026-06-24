import authClient from "@/lib/auth-client";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await authClient.getSession();
  if (session?.data?.session?.token) {
    const token = session.data.session.token;
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default api;
