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
};

export type MealPost = {
  type: MealType;
  date: Date;
  items: {
    foodId: string;
    consumedGrams: number;
  }[];
};
