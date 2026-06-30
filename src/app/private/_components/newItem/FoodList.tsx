import { Food } from "@/models/foods-model";
import Colors from "@/shared/theme/colors.json";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { FoodListItem } from "./FoodListItem";

export type FoodListProps = {
  foods: Food[] | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  onAdd: (food: Food) => void;
  onRefetch: () => void;
};

export function FoodList({
  foods,
  isLoading,
  isRefetching,
  onAdd,
  onRefetch,
}: FoodListProps) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!foods || foods.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <Ionicons
          name="nutrition-outline"
          size={40}
          color={Colors.neutralLight}
        />
        <Text className="text-neutralLight font-inter text-sm mt-3">
          Nenhum alimento encontrado
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FoodListItem food={item} onAdd={onAdd} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefetch}
          colors={[Colors.primary]}
          tintColor={Colors.primary}
        />
      }
    />
  );
}
