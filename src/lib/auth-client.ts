import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL,
  fetchOptions: {
    headers: {
      Origin: "meuapp://", // Required: React Native doesn't send Origin automatically
    },
  },
  plugins: [
    expoClient({
      scheme: "meuapp",
      storagePrefix: "meuapp",
      storage: SecureStore,
    }),
  ],
});

export default authClient;
