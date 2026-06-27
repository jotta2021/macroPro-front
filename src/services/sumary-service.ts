import api from "@/core/api";
import { SummaryDiary } from "@/models/sumary-model";

export default async function getSumary(date: string): Promise<SummaryDiary> {
  const res = await api.get("/meals/summary", {
    params: {
      date,
    },
  });
  return res.data;
}
