import { ActivityLevel } from "@/enum/activitylevel-enum";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ActivityLevelProps {
  value: ActivityLevel;
  onChange: (val: ActivityLevel) => void;
}

const options: {
  label: string;
  description: string;
  value: ActivityLevel;
  iconName: "bed-outline" | "walk-outline" | "flame-outline";
}[] = [
  {
    label: "Sedentário",
    description: "Pouco ou nenhum exercício",
    value: ActivityLevel.SEDENTARY,
    iconName: "bed-outline",
  },
  {
    label: "Moderado",
    description: "Exercício leve a moderado (3–5 dias/semana)",
    value: ActivityLevel.MODERATE,
    iconName: "walk-outline",
  },
  {
    label: "Intenso",
    description: "Treino pesado ou esporte (6–7 dias/semana)",
    value: ActivityLevel.INTENSE,
    iconName: "flame-outline",
  },
];

export default function ActivityLevelStep({
  value,
  onChange,
}: ActivityLevelProps) {
  return (
    <View className="flex-1">
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-2xl font-inter-bold text-neutral">
            Qual é o seu nível de atividade?
          </Text>
          <Text className="text-base font-inter text-neutral/60">
            Selecione o nível que melhor descreve sua rotina de exercícios atual.
          </Text>
        </View>

        <View className="gap-3">
          {options.map((opt) => {
            const isActive = value === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                activeOpacity={0.8}
                onPress={() => onChange(opt.value)}
                className={`flex-row items-center gap-4 px-5 py-4 rounded-2xl border-2 ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <Ionicons
                  name={opt.iconName}
                  size={24}
                  color={isActive ? "#7ED957" : "#9CA3AF"}
                />
                <View className="flex-1">
                  <Text
                    className={`font-inter-bold text-base ${
                      isActive ? "text-primary" : "text-neutral"
                    }`}
                  >
                    {opt.label}
                  </Text>
                  <Text className="font-inter text-sm text-neutral/50">
                    {opt.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
