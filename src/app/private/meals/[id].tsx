import { AddFoodSheet } from "@/app/private/_components/newItem/AddFoodSheet";
import { MealItemCard } from "@/app/private/_components/newItem/MealItemCard";
import { MealSummaryCard } from "@/app/private/_components/newItem/MealSummaryCard";
import { apiKeys } from "@/core/apiKeys";
import { MealTypeDescription } from "@/enum/meal-enum";
import { getErrorMessage } from "@/hook/getErrorMessage";
import queryClient from "@/lib/query-client";
import { Food } from "@/models/foods-model";
import { MealItemResponse } from "@/models/meals-model";
import { getMealById, updateMealFood } from "@/services/meals-service";
import { toastColors } from "@/shared/theme/toast-colors";
import CustomButton from "@/shared/ui/customButton";
import { Shimmer, ShimmerGroup } from "@/shared/ui/molecules/Shimmer/Shimmer";
import { useToast } from "@/shared/ui/molecules/Toast";
import type { BottomSheetMethods } from "@/shared/ui/templates/bottom-sheet/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const toast = useToast();
  const sheetRef = useRef<BottomSheetMethods>(null);
  const [selectedItem, setSelectedItem] = useState<MealItemResponse | null>(
    null,
  );

  const { data: meal, isLoading } = useQuery({
    queryFn: () => getMealById(id),
    queryKey: [apiKeys.meals, id],
    enabled: !!id,
  });

  const title = meal ? MealTypeDescription[meal.type] : "Refeição";

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateMealFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.meals, id] });
      queryClient.invalidateQueries({ queryKey: [apiKeys.summary] });
      toast.show("Gramatura atualizada!", {
        type: "success",
        backgroundColor: toastColors["success"],
        position: "top",
      });
      sheetRef.current?.close();
    },
    onError: (error: Error) => {
      toast.show(getErrorMessage(error), {
        type: "error",
        backgroundColor: toastColors["error"],
        position: "top",
      });
    },
  });

  function handleAddMore() {
    router.push({
      pathname: "/private/meals/newItens",
      params: { title, type: meal?.type, mealId: id },
    });
  }

  function handleEditPress(item: MealItemResponse) {
    setSelectedItem(item);
    sheetRef.current?.expand();
  }

  async function onConfirmEdit(food: Food, grams: number) {
    if (!selectedItem) return;
    await mutateAsync({
      mealId: id,
      itemId: food.id,
      consumedGrams: grams,
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
                      <MealItemCard
                        key={item.id}
                        item={item}
                        mealId={id}
                        onEditPress={handleEditPress}
                      />
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

        <AddFoodSheet
          ref={sheetRef}
          food={selectedItem?.food ?? null}
          initialGrams={selectedItem ? String(selectedItem.consumedGrams) : ""}
          isPending={isPending}
          confirmLabel="Salvar alteração"
          onConfirm={onConfirmEdit}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
