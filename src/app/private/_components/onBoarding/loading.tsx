import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CircularProgress } from "@/shared/ui/organisms/circular-progress";

const LOADING_STEPS = [
  "Analisando suas respostas",
  "Calculando objetivo calórico",
  "Definindo distribuição de macronutrientes",
  "Estruturando seu plano personalizado",
];

export default function LoadingPlan() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const progressValue = (currentStep + 1) / LOADING_STEPS.length;

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <View className="items-center mb-10 gap-6">
        <CircularProgress
          progress={progressValue}
          size={120}
          strokeWidth={10}
          outerCircleColor="#F3F4F6"
          progressCircleColor="#7ED957"
          backgroundColor="transparent"
          renderIcon={() => (
            <Text className="text-xl font-inter-bold text-neutral">
              {Math.round(progressValue * 100)}%
            </Text>
          )}
        />
        <Text className="text-2xl font-inter-bold text-neutral text-center px-2">
          Estamos montando o seu planejamento
        </Text>
      </View>

      <View className="w-full max-w-[280px] gap-4">
        {LOADING_STEPS.map((stepText, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <View
              key={index}
              className={`flex-row items-center gap-4 py-3 px-4 rounded-2xl border ${
                isActive
                  ? "border-primary/20 bg-primary/5"
                  : "border-transparent"
              }`}
            >
              <View className="w-6 h-6 items-center justify-center">
                {isCompleted ? (
                  <Ionicons name="checkmark-circle" size={22} color="#7ED957" />
                ) : isActive ? (
                  <ActivityIndicator size="small" color="#7ED957" />
                ) : (
                  <View className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                )}
              </View>
              <Text
                className={`font-inter text-base flex-1 ${
                  isCompleted
                    ? "text-neutral/60"
                    : isActive
                    ? "text-neutral font-inter-bold"
                    : "text-neutral/30"
                }`}
              >
                {stepText}
                {isActive ? "..." : ""}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
