import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL,
  fetchOptions: {
    headers: {
      Origin: "http://10.0.2.2:3000",
    },
    credentials: "include",
  },
});

export default authClient;
