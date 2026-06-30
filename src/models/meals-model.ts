import { MealType } from "@/enum/meal-enum";

export type MealFood = {
  id: string;
  name: string;
  calories: number;
  carbo: number;
  protein: number;
  fat: number;
  baseGrams: number;
};

export type MealItemResponse = {
  id: string;
  mealId: string;
  foodId: string;
  consumedGrams: number;
  food: MealFood;
};

export type MealResponse = {
  id: string;
  userId: string;
  type: MealType;
  date: string;
  items: MealItemResponse[];
  totalCalories?: number;
  totalCarbo?: number;
  totalProtein?: number;
  totalFat?: number;
  targetCalories?: number;
  targetCarbo?: number;
  targetProtein?: number;
  targetFat?: number;
};

export type MealPost = {
  id: string;
  type: MealType;
  date: Date;
  items: {
    foodId: string;
    consumedGrams: number;
  }[];
};
