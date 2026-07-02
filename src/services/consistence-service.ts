import api from "@/core/api";
import { Consistence } from "@/models/consistence-model";

export async function getConsistence(): Promise<Consistence> {
  const res = await api.get("/meals/consistence");
  return res.data;
}
