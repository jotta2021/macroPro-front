import api from "@/core/api";
import { Food } from "@/models/foods-model";

export default async function getFoods(name?: string): Promise<Food[]> {
  const res = await api.get("/foods", {
    params: {
      name,
    },
  });

  return res.data;
}
