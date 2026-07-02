import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="editProfile"
        options={{ headerShown: true, title: "Editar perfil" }}
      />
      <Stack.Screen name="meals/newItens" options={{ headerShown: true }} />
      <Stack.Screen
        name="consistence"
        options={{ headerShown: true, title: "Consistência" }}
      />
    </Stack>
  );
}
