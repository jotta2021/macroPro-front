import { SummaryDiary } from "@/models/sumary-model";
import { FlatList, Text, View } from "react-native";
import MealItem from "./mealItem";

interface MealListProps {
  meals?: SummaryDiary["meals"];
}

export default function MealList({ meals }: MealListProps) {
  return (
    <View className="mt-4">
      {/* Title Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-inter-bold text-neutral">
          Alimentação
        </Text>
      </View>

      {/* Card Wrapper */}
      <View className="bg-white border border-gray-100 rounded-3xl px-5 py-2 shadow-sm shadow-black/5">
        <FlatList
          data={meals}
          renderItem={({ item, index }) => (
            <MealItem
              item={item}
              index={index}
              meals={meals as SummaryDiary["meals"]}
            />
          )}
          keyExtractor={(item) => item.type}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />
      </View>
    </View>
  );
}
