import api from "@/core/api";
import { completeProfile, profileProps } from "@/models/profile-model";

export default async function postProfile(props: profileProps) {
  const res = await api.post("/profile", props);
  return res.data;
}

export async function getProfile(): Promise<completeProfile> {
  const res = await api.get("/profile");
  return res.data;
}
