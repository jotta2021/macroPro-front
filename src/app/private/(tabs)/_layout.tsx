import colors from "@/shared/theme/colors.json";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="diary"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="home" color={colors.primary} size={24} />
            ) : (
              <FontAwesome name="home" color={color} size={24} />
            ),
          tabBarLabel: "Diário",
          tabBarActiveTintColor: colors.primaryDark,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="user" color={colors.primary} size={24} />
            ) : (
              <FontAwesome name="user" color={color} size={24} />
            ),
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: colors.primaryDark,
        }}
      />
    </Tabs>
  );
}
