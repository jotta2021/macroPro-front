import { ActivityLevel } from "@/enum/activitylevel-enum";
import { Gender } from "@/enum/gender-enum";
import { Goal } from "@/enum/goal-enum";
import { User } from "better-auth/client";

export type profileProps = {
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  age: number;
  gender: Gender;
  dailyCalories?: number;
  carbo?: number;
  protein?: number;
  fat?: number;
};

export type completeProfile = profileProps & {
  userId: string;
  user: User;
};
