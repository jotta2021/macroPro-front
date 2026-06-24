import { Goal } from "@/enum/goal-enum";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GoalProps {
  value: Goal;
  onChange: (val: Goal) => void;
}

const options: {
  label: string;
  description: string;
  value: Goal;
  iconName: "barbell-outline" | "pulse-outline" | "trending-down-outline";
}[] = [
  {
    label: "Hipertrofia",
    description: "Ganho de massa muscular",
    value: Goal.HYPERTROPHY,
    iconName: "barbell-outline",
  },
  {
    label: "Manutenção",
    description: "Manter o peso e composição corporal atual",
    value: Goal.MAINTENANCE,
    iconName: "pulse-outline",
  },
  {
    label: "Perda de peso",
    description: "Redução de gordura corporal",
    value: Goal.WEIGHTLOSS,
    iconName: "trending-down-outline",
  },
];

export default function GoalStep({ value, onChange }: GoalProps) {
  return (
    <View className="flex-1">
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-2xl font-inter-bold text-neutral">
            Qual é o seu objetivo?
          </Text>
          <Text className="text-base font-inter text-neutral/60">
            Selecione o objetivo principal que deseja alcançar com o Gainz.
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
