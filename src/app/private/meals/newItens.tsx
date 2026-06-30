import { AddFoodSheet } from "@/app/private/_components/newItem/AddFoodSheet";
import { FoodList } from "@/app/private/_components/newItem/FoodList";
import { apiKeys } from "@/core/apiKeys";
import { MealType } from "@/enum/meal-enum";
import queryClient from "@/lib/query-client";
import { Food } from "@/models/foods-model";
import getFoods from "@/services/foods-service";
import { postMeals, updateMeal } from "@/services/meals-service";
import Colors from "@/shared/theme/colors.json";
import { toastColors } from "@/shared/theme/toast-colors";
import CustomButton from "@/shared/ui/customButton";
import { SearchBar } from "@/shared/ui/molecules/search-bar/SearchBar";
import { useToast } from "@/shared/ui/molecules/Toast";
import type { BottomSheetMethods } from "@/shared/ui/templates/bottom-sheet/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";

const formSchema = z.object({
  type: z.enum(MealType),
  date: z.date().min(1, { message: "Informe a data" }),
  items: z
    .array(
      z.object({
        foodId: z.string().min(1, { message: "Informe o alimento" }),
        consumedGrams: z
          .number()
          .min(1, { message: "Informe a quantidade consumida" }),
      }),
    )
    .min(1, { message: "Informe pelo menos um alimento" }),
});

type FormData = z.infer<typeof formSchema>;

export default function NewItens() {
  const { title, type, mealId } = useLocalSearchParams<{
    title: string;
    type: MealType;
    mealId?: string;
  }>();
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const sheetRef = useRef<BottomSheetMethods>(null);
  const toast = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: type,
      date: new Date(),
      items: [],
    },
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "items",
  });
  const {
    data: foods,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () => getFoods(search),
    queryKey: [apiKeys.foods, search],
    retry: 2,
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postMeals,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.meals] });
      queryClient.invalidateQueries({ queryKey: [apiKeys.summary] });
      toast.show("Refeição adicionada com sucesso!", {
        type: "success",
        backgroundColor: toastColors["success"],
        position: "top",
      });
      router.back();
    },
    onError: (error) => {
      toast.show(error?.message || "Ocorreu um erro", {
        type: "error",
        backgroundColor: toastColors["error"],
        position: "top",
      });
    },
  });

  const { mutateAsync: updateAsync, isPending: isUpdating } = useMutation({
    mutationFn: updateMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.meals] });
      queryClient.invalidateQueries({ queryKey: [apiKeys.summary] });
      toast.show("Refeição atualizada com sucesso!", {
        type: "success",
        backgroundColor: toastColors["success"],
        position: "top",
      });
      router.back();
    },
    onError: (error) => {
      toast.show(error?.message || "Ocorreu um erro", {
        type: "error",
        backgroundColor: toastColors["error"],
        position: "top",
      });
    },
  });

  function handleOpenFoodSheet(food: Food) {
    setSelectedFood(food);
    sheetRef.current?.expand();
  }

  function handleAddFood(food: Food, consumedGrams: number) {
    append({ foodId: food.id, consumedGrams });
    toast.show("Alimento adicionado", {
      type: "success",
      backgroundColor: toastColors["success"],
      position: "top",
    });
  }

  async function onSubmit(values: FormData) {
    await mutateAsync(values);
  }

  async function onUpdate(values: FormData) {
    await updateAsync({ ...values, id: mealId as string });
  }

  const submit = mealId ? onUpdate : onSubmit;
  const isLoadingSubmit = isPending || isUpdating;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1">
        <Stack.Screen
          options={{
            title: title || "Novo item",
          }}
        />
        <View className="flex-1 px-6 py-2">
          <SearchBar
            containerWidth={350}
            tint={Colors.neutral}
            textCenterOffset={4}
            iconCenterOffset={4}
            placeholder="Buscar alimentos"
            cancelButtonWidth={70}
            onSearch={setSearch}
          />
          <View className="flex-1 mt-4">
            <FoodList
              foods={foods}
              isLoading={isLoading}
              isRefetching={isRefetching}
              onAdd={handleOpenFoodSheet}
              onRefetch={refetch}
              foodsSelecteds={form.watch("items")}
            />
          </View>

          <CustomButton
            title="Confirmar"
            onPress={form.handleSubmit(submit)}
            loading={isLoadingSubmit}
          />
        </View>

        <AddFoodSheet
          ref={sheetRef}
          food={selectedFood}
          onConfirm={handleAddFood}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
