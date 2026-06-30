import { MealItemCard } from "@/app/private/_components/newItem/MealItemCard";
import { MealSummaryCard } from "@/app/private/_components/newItem/MealSummaryCard";
import { apiKeys } from "@/core/apiKeys";
import { MealTypeDescription } from "@/enum/meal-enum";
import { getMealById } from "@/services/meals-service";
import CustomButton from "@/shared/ui/customButton";
import { Shimmer, ShimmerGroup } from "@/shared/ui/molecules/Shimmer/Shimmer";
import { useQuery } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: meal, isLoading } = useQuery({
    queryFn: () => getMealById(id),
    queryKey: [apiKeys.meals, id],
    enabled: !!id,
  });

  const title = meal ? MealTypeDescription[meal.type] : "Refeição";

  function handleAddMore() {
    router.push({
      pathname: "/private/meals/newItens",
      params: { title, type: meal?.type, mealId: id },
    });
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
        <Stack.Screen options={{ title }} />
        <View className="flex-1 px-6 py-6">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {isLoading ? (
            <ShimmerGroup isLoading={true}>
              {/* Summary card skeleton */}
              <Shimmer
                preset="neutral"
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 24,
                  marginBottom: 16,
                }}
              />
              {/* Item list skeletons */}
              <View style={{ gap: 12 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Shimmer
                    key={i}
                    preset="neutral"
                    style={{ width: "100%", height: 80, borderRadius: 16 }}
                  />
                ))}
              </View>
            </ShimmerGroup>
          ) : meal ? (
            <>
              {/* Summary */}
              <MealSummaryCard meal={meal} />

              {/* Items list */}
              {meal.items.length > 0 ? (
                <>
                  <Text className="text-neutral font-inter-bold text-sm mb-3">
                    Alimentos ({meal.items.length})
                  </Text>
                  {meal.items.map((item) => (
                    <MealItemCard key={item.id} item={item} mealId={id} />
                  ))}
                </>
              ) : (
                <View className="items-center py-10">
                  <Text className="text-neutralLight font-inter text-sm">
                    Nenhum alimento registrado ainda.
                  </Text>
                </View>
              )}
            </>
          ) : null}
        </ScrollView>
        <CustomButton title="Adicionar mais" onPress={handleAddMore} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
