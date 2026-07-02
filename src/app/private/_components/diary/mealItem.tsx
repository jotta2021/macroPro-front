import { MealType, MealTypeDescription } from "@/enum/meal-enum";
import { SummaryDiary } from "@/models/sumary-model";
import Colors from "@/shared/theme/colors.json";
import Button from "@/shared/ui/base/button";
import { CircularProgress } from "@/shared/ui/organisms/circular-progress";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";

interface Props {
  item: SummaryDiary["meals"][number];
  index: number;
  meals: SummaryDiary["meals"];
}
export default function MealItem({ item, index, meals }: Props) {
  const MealImages: Record<MealType, any> = {
    [MealType.BREAKFAST]: require("../../../../../assets/images/coffee.png"),
    [MealType.LUNCH]: require("../../../../../assets/images/fried-rice.png"),
    [MealType.DINNER]: require("../../../../../assets/images/vegetarian.png"),
    [MealType.SNACK]: require("../../../../../assets/images/french-fries.png"),
  };

  const progress =
    item.caloriesTarget > 0
      ? Math.min(item.caloriesConsumed / item.caloriesTarget, 1)
      : 0;

  const description =
    item.items && item.items.length > 0
      ? item.items.map((i) => i.name).join(", ")
      : "Nenhum alimento registrado";

  const imageUri = MealImages[item.type];
  const navigateToMeal = (mealId: string) => {
    if (!mealId) {
      router.push({
        pathname: "/private/meals/newItens",
        params: {
          title: `${MealTypeDescription[item.type]}`,
          type: item.type,
        },
      });
    } else {
      router.push({
        pathname: `/private/meals/${mealId}` as any,
        params: {
          id: mealId,
          title: `${MealTypeDescription[item.type]}`,
        },
      });
    }
  };
  return (
    <View>
      <View className="flex-row items-center justify-between py-4">
        <CircularProgress
          progress={progress}
          size={54}
          strokeWidth={3}
          outerCircleColor="#F3F4F6"
          progressCircleColor={Colors.primary}
          backgroundColor="#FFFFFF"
          gap={1}
          renderIcon={() => (
            <Image
              source={imageUri}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          )}
        />

        <View className="flex-1 ml-4 justify-center">
          <Text className="text-base font-inter-bold text-neutral">
            {MealTypeDescription[item.type]}
          </Text>
          <Text className="text-xs font-inter text-neutralLight mt-0.5">
            {item.caloriesConsumed} / {item.caloriesTarget} kcal
          </Text>

          <View className="flex-row items-center gap-1.5 mt-1">
            <Text
              className="text-xs font-inter text-neutralLight flex-1"
              numberOfLines={1}
            >
              {description}
            </Text>
          </View>
        </View>

        <Button
          backgroundColor={Colors.neutral}
          width={30}
          height={30}
          borderRadius={30}
          onPress={() => navigateToMeal(item.mealId)}
        >
          <Entypo name="plus" color={"white"} size={18} />
        </Button>
      </View>

      {meals && index < meals.length - 1 && (
        <View className="border-b border-gray-100" />
      )}
    </View>
  );
}
