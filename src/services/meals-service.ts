import api from "@/core/api";
import { MealPost, MealResponse } from "@/models/meals-model";

export default async function getMeals(date: string): Promise<MealResponse[]> {
  const response = await api.get(`/meals?date=${date}`);
  return response.data;
}

export async function postMeals(meal: MealPost) {
  const response = await api.post("/meals", meal);
  return response.data;
}
