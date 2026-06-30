import { Food } from "@/models/foods-model";
import Colors from "@/shared/theme/colors.json";
import { BottomSheet } from "@/shared/ui/templates/bottom-sheet";
import type { BottomSheetMethods } from "@/shared/ui/templates/bottom-sheet/types";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
const schema = z.object({
  consumedGrams: z
    .string()
    .min(1, "Informe a gramatura")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Insira um valor válido",
    }),
});

type FormData = z.infer<typeof schema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export type AddFoodSheetProps = {
  food: Food | null;
  onConfirm: (food: Food, grams: number) => void;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const AddFoodSheet = forwardRef<BottomSheetMethods, AddFoodSheetProps>(
  ({ food, onConfirm }, ref) => {
    const {
      control,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { consumedGrams: "" },
    });

    // reset form whenever a new food is selected
    useEffect(() => {
      reset({ consumedGrams: "" });
    }, [food, reset]);

    const gramsValue = watch("consumedGrams");
    const gramsNum = Number(gramsValue) || 0;
    const factor = food ? gramsNum / food.baseGrams : 0;
    const estimatedCalories = food ? Math.round(food.calories * factor) : 0;

    function onSubmit(data: FormData) {
      if (!food) return;
      onConfirm(food, Number(data.consumedGrams));
      (ref as React.RefObject<BottomSheetMethods>).current?.close();
    }

    return (
      <BottomSheet ref={ref} snapPoints={["55%"]} enableBackdrop>
        <View className="px-6 pt-2 pb-8">
          {/* Food info header */}
          {food && (
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

              {/* Macros row */}
              <View className="flex-row gap-2">
                <MacroChip
                  label="Kcal"
                  value={`${estimatedCalories}`}
                  highlight
                />
                <MacroChip
                  label="Carb"
                  value={`${Math.round(food.carbo * factor)}g`}
                />
                <MacroChip
                  label="Prot"
                  value={`${Math.round(food.protein * factor)}g`}
                />
                <MacroChip
                  label="Gord"
                  value={`${Math.round(food.fat * factor)}g`}
                />
              </View>
            </View>
          )}

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
            className="bg-primary w-full py-4 rounded-2xl items-center mt-5"
          >
            <Text className="text-white font-inter-semibold text-sm">
              Adicionar alimento
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  },
);

// ---------------------------------------------------------------------------
// Helper chip
// ---------------------------------------------------------------------------
function MacroChip({
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
