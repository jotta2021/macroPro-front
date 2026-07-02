import FireLight from "@/assets/animations/Fire-light.json";
import Fire from "@/assets/animations/Fire.json";
import { apiKeys } from "@/core/apiKeys";
import { getConsistence } from "@/services/consistence-service";
import { useQuery } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Consistence() {
  const { data, isLoading } = useQuery({
    queryKey: [apiKeys.consistence],
    queryFn: getConsistence,
  });

  const hasStreak = (data?.consistenceDays ?? 0) > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="py-6 px-6">
        {isLoading ? (
          <ActivityIndicator size="large" className="mt-10" />
        ) : (
          <View className="flex items-center gap-2">
            <LottieView
              source={hasStreak ? Fire : FireLight}
              style={{ width: 200, height: 200, alignSelf: "center" }}
              autoPlay
              loop
            />
            <Text className="text-neutral font-inter-bold text-6xl">
              {data?.consistenceDays ?? 0} <Text className="text-lg">dias</Text>
            </Text>
            <Text className="text-neutral text-xl">em sequência</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
