import { Food } from "@/models/foods-model";
import Colors from "@/shared/theme/colors.json";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type FoodListItemProps = {
  food: Food;
  onAdd: (food: Food) => void;
  foodIsSelected?: boolean;
};

export function FoodListItem({
  food,
  onAdd,
  foodIsSelected,
}: FoodListItemProps) {
  return (
    <View className="flex-row items-center mt-1 justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3  shadow-sm shadow-black/5">
      {/* Info */}
      <View className="flex-1 mr-3">
        <Text
          className="text-neutral font-inter-semibold text-base"
          numberOfLines={1}
        >
          {food.name}
        </Text>
        <View className="flex-row gap-3 mt-1">
          <Text className="text-neutralLight font-inter text-sm">
            {food.baseGrams}g
          </Text>
          <Text className="text-neutralLight font-inter text-sm">
            {food.calories} kcal
          </Text>
        </View>
      </View>

      {/* Add button */}
      <TouchableOpacity
        onPress={() => onAdd(food)}
        activeOpacity={0.75}
        className={` ${foodIsSelected ? "bg-primary" : "bg-transparent"} border-2  border-primary rounded-full w-9 h-9 items-center justify-center transition-all duration-300`}
      >
        {foodIsSelected ? (
          <Ionicons name="checkmark" size={20} color={"white"} />
        ) : (
          <Ionicons name="add" size={20} color={Colors.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
}
