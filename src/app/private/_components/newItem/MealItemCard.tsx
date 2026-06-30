import { apiKeys } from "@/core/apiKeys";
import queryClient from "@/lib/query-client";
import { MealItemResponse } from "@/models/meals-model";
import { updateMealFood } from "@/services/meals-service";
import Colors from "@/shared/theme/colors.json";
import { toastColors } from "@/shared/theme/toast-colors";
import { BottomSheet } from "@/shared/ui/templates/bottom-sheet";
import type { BottomSheetMethods } from "@/shared/ui/templates/bottom-sheet/types";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { useToast } from "@/shared/ui/molecules/Toast";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
const gramsSchema = z.object({
  consumedGrams: z
    .string()
    .min(1, "Informe a gramatura")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Insira um valor válido",
    }),
});

type GramsFormData = z.infer<typeof gramsSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface MealItemCardProps {
  item: MealItemResponse;
  mealId: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function MealItemCard({ item, mealId }: MealItemCardProps) {
  const { food, consumedGrams, id: itemId } = item;
  const factor = consumedGrams / food.baseGrams;

  const cal = Math.round(food.calories * factor);
  const carbo = Math.round(food.carbo * factor);
  const protein = Math.round(food.protein * factor);
  const fat = Math.round(food.fat * factor);

  const sheetRef = useRef<BottomSheetMethods>(null);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<GramsFormData>({
    resolver: zodResolver(gramsSchema),
    defaultValues: { consumedGrams: String(consumedGrams) },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateMealFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.meals, mealId] });
      queryClient.invalidateQueries({ queryKey: [apiKeys.summary] });
      toast.show("Gramatura atualizada!", {
        type: "success",
        backgroundColor: toastColors["success"],
        position: "top",
      });
      sheetRef.current?.close();
    },
    onError: (error: Error) => {
      toast.show(error?.message || "Ocorreu um erro", {
        type: "danger",
        backgroundColor: toastColors["error"],
        position: "top",
      });
    },
  });

  function handleOpenSheet() {
    reset({ consumedGrams: String(consumedGrams) });
    sheetRef.current?.expand();
  }

  async function onSubmit(data: GramsFormData) {
    await mutateAsync({
      mealId,
      itemId,
      consumedGrams: Number(data.consumedGrams),
    });
  }

  // Live preview inside the sheet
  const gramsValue = watch("consumedGrams");
  const gramsNum = Number(gramsValue) || 0;
  const previewFactor = gramsNum / food.baseGrams;
  const previewCal = Math.round(food.calories * previewFactor);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Card row                                                             */}
      {/* ------------------------------------------------------------------ */}
      <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-3 shadow-sm shadow-black/5">
        {/* Icon */}
        <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-3">
          <Ionicons name="nutrition-outline" size={18} color={Colors.primary} />
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text
            className="text-neutral font-inter-semibold text-sm"
            numberOfLines={1}
          >
            {food.name}
          </Text>
          <Text className="text-neutralLight font-inter text-xs mt-0.5">
            {consumedGrams}g · {cal} kcal
          </Text>

          {/* Macro chips */}
          <View className="flex-row gap-2 mt-1.5">
            <MacroChip label="C" value={carbo} color={Colors.primary} />
            <MacroChip label="P" value={protein} color={Colors.secondary} />
            <MacroChip label="G" value={fat} color="#A78BFA" />
          </View>
        </View>

        {/* Edit button */}
        <TouchableOpacity
          onPress={handleOpenSheet}
          activeOpacity={0.7}
          className="w-9 h-9 rounded-xl bg-gray-100 items-center justify-center ml-2"
          accessibilityLabel={`Editar gramatura de ${food.name}`}
        >
          <Ionicons name="pencil-outline" size={16} color={Colors.neutral} />
        </TouchableOpacity>
      </View>

      {/* ------------------------------------------------------------------ */}
      {/* Edit grams sheet                                                     */}
      {/* ------------------------------------------------------------------ */}
      <BottomSheet ref={sheetRef} snapPoints={["50%"]} enableBackdrop>
        <View className="px-6 pt-2 pb-8">
          {/* Food info header */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-5">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                <Ionicons
                  name="nutrition-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-neutral font-inter-semibold text-base"
                  numberOfLines={1}
                >
                  {food.name}
                </Text>
                <Text className="text-neutralLight font-inter text-xs mt-0.5">
                  Base: {food.baseGrams}g
                </Text>
              </View>
            </View>

            {/* Live macro preview */}
            <View className="flex-row gap-2">
              <PreviewChip label="Kcal" value={`${previewCal}`} highlight />
              <PreviewChip
                label="Carb"
                value={`${Math.round(food.carbo * previewFactor)}g`}
              />
              <PreviewChip
                label="Prot"
                value={`${Math.round(food.protein * previewFactor)}g`}
              />
              <PreviewChip
                label="Gord"
                value={`${Math.round(food.fat * previewFactor)}g`}
              />
            </View>
          </View>

          {/* Grams input */}
          <Text className="text-neutral font-inter-semibold text-sm mb-2">
            Gramatura consumida
          </Text>
          <Controller
            control={control}
            name="consumedGrams"
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                className={`flex-row items-center border rounded-xl px-4 bg-gray-50 h-12 ${
                  errors.consumedGrams ? "border-red-400" : "border-gray-200"
                }`}
              >
                <TextInput
                  className="flex-1 text-neutral font-inter text-sm"
                  placeholder="Ex: 150"
                  placeholderTextColor={Colors.neutralLight}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                <Text className="text-neutralLight font-inter text-sm">g</Text>
              </View>
            )}
          />
          {errors.consumedGrams && (
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="alert-circle-outline" size={12} color="#f87171" />
              <Text className="text-red-400 font-inter text-xs">
                {errors.consumedGrams.message}
              </Text>
            </View>
          )}

          {/* Confirm button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.85}
            disabled={isPending}
            className={`w-full py-4 rounded-2xl items-center mt-5 ${
              isPending ? "bg-neutral/20" : "bg-primary"
            }`}
          >
            <Text
              className={`font-inter-semibold text-sm ${
                isPending ? "text-neutral/70" : "text-white"
              }`}
            >
              {isPending ? "Salvando..." : "Salvar alteração"}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
}

// ---------------------------------------------------------------------------
// Inline helpers
// ---------------------------------------------------------------------------
function MacroChip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View
      className="flex-row items-center gap-0.5 px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}18` }}
    >
      <Text className="font-inter-semibold text-[10px]" style={{ color }}>
        {label}
      </Text>
      <Text className="font-inter text-[10px]" style={{ color }}>
        {value}g
      </Text>
    </View>
  );
}

function PreviewChip({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View
      className={`flex-1 rounded-xl py-2 items-center ${
        highlight ? "bg-primary/10" : "bg-white"
      }`}
    >
      <Text
        className={`font-inter-semibold text-sm ${
          highlight ? "text-primary" : "text-neutral"
        }`}
      >
        {value}
      </Text>
      <Text className="text-neutralLight font-inter text-xs mt-0.5">
        {label}
      </Text>
    </View>
  );
}
