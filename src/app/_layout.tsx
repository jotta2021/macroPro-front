import authClient from "@/lib/auth-client";
import queryClient from "@/lib/query-client";
import { ToastProviderWithViewport } from "@/shared/ui/molecules/Toast";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  const { data: session, isPending } = authClient.useSession();

  if (!loaded || isPending) {
    return null;
  }

  const isLoggedIn = !!session;
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProviderWithViewport>
        <Stack>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="started" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="private" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </ToastProviderWithViewport>
    </QueryClientProvider>
  );
}
