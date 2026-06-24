import { ActivityLevel } from "@/enum/activitylevel-enum";
import { Gender } from "@/enum/gender-enum";
import { Goal } from "@/enum/goal-enum";
import { create } from "zustand";

interface OnboardingState {
  progress: number;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  setProgress: (progress: number) => void;
  setAge: (age: number) => void;
  setGender: (gender: Gender) => void;
  setWeight: (weight: number) => void;
  setHeight: (height: number) => void;
  setActivityLevel: (activityLevel: ActivityLevel) => void;
  setGoal: (goal: Goal) => void;
}

export const useOnboarding = create<OnboardingState>((set) => ({
  progress: 0,
  age: 0,
  gender: Gender.MALE,
  weight: 0,
  height: 0,
  activityLevel: ActivityLevel.MODERATE,
  goal: Goal.HYPERTROPHY,
  setProgress: (progress: number) => set({ progress }),
  setAge: (age: number) => set({ age }),
  setGender: (gender: Gender) => set({ gender }),
  setWeight: (weight: number) => set({ weight }),
  setHeight: (height: number) => set({ height }),
  setActivityLevel: (activityLevel: ActivityLevel) => set({ activityLevel }),
  setGoal: (goal: Goal) => set({ goal }),
}));
