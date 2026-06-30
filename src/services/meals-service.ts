import api from "@/core/api";
import { MealResponse } from "@/models/meals-model";

export default async function getMeals(date: string): Promise<MealResponse[]> {
  const response = await api.get(`/meals?date=${date}`);
  return response.data;
}
