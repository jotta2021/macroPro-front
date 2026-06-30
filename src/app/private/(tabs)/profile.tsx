import { apiKeys } from "@/core/apiKeys";
import { descriptionActivityLevel } from "@/enum/activitylevel-enum";
import { descriptionGender } from "@/enum/gender-enum";
import { descriptionGoal } from "@/enum/goal-enum";
import authClient from "@/lib/auth-client";
import { getProfile } from "@/services/profile-service";
import Colors from "@/shared/theme/colors.json";
import Avatar from "@/shared/ui/base/avatar";
import { AnimatedHeaderScrollView } from "@/shared/ui/organisms/animated-header-scrollview";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getGoalIcon = (goal?: string): keyof typeof Ionicons.glyphMap => {
  switch (goal) {
    case "HYPERTROPHY":
      return "barbell-outline";
    case "MAINTENANCE":
      return "scale-outline";
    case "WEIGHTLOSS":
      return "trending-down-outline";
    default:
      return "flag-outline";
  }
};

export default function Profile() {
  const handleLogout = async () => {
    await authClient.signOut();
  };
  const { data, isPending } = useQuery({
    queryFn: getProfile,
    queryKey: [apiKeys.profile],
  });

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#7ED957" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
          <AnimatedHeaderScrollView
            largeTitle="Meu Perfil"
            headerBackgroundGradient={{
              colors: ["#fff", "#fff", "#fff"],
              start: { x: 0.5, y: 0 },
              end: { x: 0.5, y: 1 },
            }}
            largeHeaderTitleStyle={{
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.neutral,
            }}
            smallHeaderTitleStyle={{
              color: Colors.neutral,
              fontWeight: "500",
              fontSize: 18,
            }}
            contentContainerStyle={{
              backgroundColor: "#fff",
            }}
            /**
             *  rightComponent={
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4"
              >
                <Ionicons name="settings" size={24} color={Colors.neutral} />
              </TouchableOpacity>
            }
             */
          >
            {/* User Profile Card */}
            <View className="bg-gray-50 border border-gray-100 rounded-3xl p-5 flex-row items-center gap-4 mb-6">
              <Avatar
                image={{
                  name: data?.user?.name,
                  uri: data?.user?.image as string,
                }}
                backgroundColor={Colors.primary}
                size={70}
              />
              <View className="flex-1 gap-1">
                <Text
                  className="text-xl font-inter-bold text-neutral"
                  numberOfLines={1}
                >
                  {data?.user?.name || "Usuário"}
                </Text>
                <Text
                  className="text-sm font-inter text-neutralLight"
                  numberOfLines={1}
                >
                  {data?.user?.email}
                </Text>

                {/* Goal Pill */}
                <View className="flex-row mt-1 items-center gap-2">
                  <Text className="text-sm font-inter text-neutralLight">
                    Objetivo:
                  </Text>
                  <View className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex-row items-center gap-1.5">
                    <Ionicons
                      name={getGoalIcon(data?.goal)}
                      size={13}
                      color="#7ED957"
                    />
                    <Text className="text-primary font-inter-semibold text-xs">
                      {data?.goal && descriptionGoal[data?.goal]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Your Plan Card */}
            <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm shadow-black/5">
              <Text className="text-lg font-inter-bold text-neutral mb-4">
                Plano Nutricional
              </Text>

              {/* Calories Highlight */}
              <View className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex-row justify-between items-center mb-5">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-primary/15 items-center justify-center">
                    <Ionicons name="flame" size={22} color="#7ED957" />
                  </View>
                  <View>
                    <Text className="text-xs font-inter-medium text-neutralLight">
                      Meta Calórica Diária
                    </Text>
                    <Text className="text-2xl font-inter-bold text-neutral">
                      {data?.dailyCalories || 0} kcal
                    </Text>
                  </View>
                </View>
              </View>

              {/* Macronutrients Grid */}
              <View className="flex-row gap-3">
                {/* Carboidratos */}
                <View className="flex-1 bg-amber-50/50 border border-amber-100/80 rounded-2xl p-3 items-center gap-1">
                  <Text className="text-xs font-inter-semibold text-amber-600">
                    Carbos
                  </Text>
                  <Text className="text-lg font-inter-bold text-neutral">
                    {data?.carbo || 0}g
                  </Text>
                </View>

                {/* Proteínas */}
                <View className="flex-1 bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-3 items-center gap-1">
                  <Text className="text-xs font-inter-semibold text-emerald-600">
                    Proteínas
                  </Text>
                  <Text className="text-lg font-inter-bold text-neutral">
                    {data?.protein || 0}g
                  </Text>
                </View>

                {/* Gorduras */}
                <View className="flex-1 bg-rose-50/50 border border-rose-100/80 rounded-2xl p-3 items-center gap-1">
                  <Text className="text-xs font-inter-semibold text-rose-600">
                    Gorduras
                  </Text>
                  <Text className="text-lg font-inter-bold text-neutral">
                    {data?.fat || 0}g
                  </Text>
                </View>
              </View>
            </View>

            {/* Physical Stats / Profile Data */}
            <View className="bg-white border border-gray-100 rounded-3xl p-5 gap-4 mb-6 shadow-sm shadow-black/5">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-lg font-inter-bold text-neutral">
                  Dados Físicos & Rotina
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({
                      pathname: "/private/editProfile",
                      params: {
                        weight: String(data?.weight ?? ""),
                        height: String(data?.height ?? ""),
                        age: String(data?.age ?? ""),
                        gender: data?.gender ?? "",
                        activityLevel: data?.activityLevel ?? "",
                        goal: data?.goal ?? "",
                      },
                    })
                  }
                  className="flex-row items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-xl"
                >
                  <Ionicons name="pencil-outline" size={14} color="#8F95A3" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between pb-3.5 border-b border-gray-100">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-gray-50 items-center justify-center">
                    <Ionicons
                      name="barbell-outline"
                      size={18}
                      color="#8F95A3"
                    />
                  </View>
                  <Text className="text-base font-inter-medium text-neutral/80">
                    Peso
                  </Text>
                </View>
                <Text className="text-base font-inter-bold text-neutral">
                  {data?.weight} kg
                </Text>
              </View>

              <View className="flex-row items-center justify-between pb-3.5 border-b border-gray-100">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-gray-50 items-center justify-center">
                    <Ionicons name="resize-outline" size={18} color="#8F95A3" />
                  </View>
                  <Text className="text-base font-inter-medium text-neutral/80">
                    Altura
                  </Text>
                </View>
                <Text className="text-base font-inter-bold text-neutral">
                  {data?.height} cm
                </Text>
              </View>

              <View className="flex-row items-center justify-between pb-3.5 border-b border-gray-100">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-gray-50 items-center justify-center">
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#8F95A3"
                    />
                  </View>
                  <Text className="text-base font-inter-medium text-neutral/80">
                    Idade
                  </Text>
                </View>
                <Text className="text-base font-inter-bold text-neutral">
                  {data?.age} anos
                </Text>
              </View>

              <View className="flex-row items-center justify-between pb-3.5 border-b border-gray-100">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-gray-50 items-center justify-center">
                    <Ionicons
                      name="male-female-outline"
                      size={18}
                      color="#8F95A3"
                    />
                  </View>
                  <Text className="text-base font-inter-medium text-neutral/80">
                    Gênero
                  </Text>
                </View>
                <Text className="text-base font-inter-bold text-neutral">
                  {data?.gender && descriptionGender[data?.gender]}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-gray-50 items-center justify-center">
                    <Ionicons name="walk-outline" size={18} color="#8F95A3" />
                  </View>
                  <Text className="text-base font-inter-medium text-neutral/80">
                    Nível de Atividade
                  </Text>
                </View>
                <Text
                  className="text-base font-inter-bold text-neutral"
                  numberOfLines={1}
                >
                  {data?.activityLevel &&
                    descriptionActivityLevel[data?.activityLevel]}
                </Text>
              </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.85}
              className="w-full border border-red-100 bg-red-50/50 py-4 rounded-2xl items-center justify-center flex-row gap-2 mb-6"
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text className="text-red-500 font-inter-bold text-base">
                Sair da Conta
              </Text>
            </TouchableOpacity>
          </AnimatedHeaderScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
