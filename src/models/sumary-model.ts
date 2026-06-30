import { MealType } from "@/enum/meal-enum";

export type DailyResume = {
  caloriesTarget: number;
  caloriesConsumed: number;
  proteinTarget: number;
  proteinConsumed: number;
  carboTarget: number;
  carboConsumed: number;
  fatTarget: number;
  fatConsumed: number;
};
export type SummaryDiary = {
  dailySummary: DailyResume;
  meals: [
    {
      type: MealType;
      mealId: string;
      caloriesTarget: number;
      caloriesConsumed: number;
      proteinConsumed: number;
      carboConsumed: number;
      fatConsumed: number;
      items: [
        {
          id: string;
          name: string;
          grams: number;
          calories: number;
          protein: number;
          carbo: number;
          fat: number;
        },
      ];
    },
  ];
};
