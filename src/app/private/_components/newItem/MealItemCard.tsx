import { MealItemResponse } from "@/models/meals-model";
import Colors from "@/shared/theme/colors.json";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import MacroChip from "./MacroChip";

interface MealItemCardProps {
  item: MealItemResponse;
  mealId: string;
  onEditPress: (item: MealItemResponse) => void;
}
export function MealItemCard({ item, onEditPress }: MealItemCardProps) {
  const { food, consumedGrams } = item;
  const factor = consumedGrams / food.baseGrams;

  const cal = Math.round(food.calories * factor);
  const carbo = Math.round(food.carbo * factor);
  const protein = Math.round(food.protein * factor);
  const fat = Math.round(food.fat * factor);

  return (
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

        <View className="flex-row gap-2 mt-1.5">
          <MacroChip label="C" value={carbo} color={Colors.primary} />
          <MacroChip label="P" value={protein} color={Colors.secondary} />
          <MacroChip label="G" value={fat} color="#A78BFA" />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onEditPress(item)}
        activeOpacity={0.7}
        className="w-9 h-9 rounded-xl bg-gray-100 items-center justify-center ml-2"
        accessibilityLabel={`Editar gramatura de ${food.name}`}
      >
        <Ionicons name="pencil-outline" size={16} color={Colors.neutral} />
      </TouchableOpacity>
    </View>
  );
}
