import { Gender } from "@/enum/gender-enum";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GenderProps {
  value: Gender;
  onChange: (val: Gender) => void;
}

const options: { label: string; value: Gender; iconName: "male" | "female" }[] = [
  { label: "Masculino", value: Gender.MALE, iconName: "male" },
  { label: "Feminino", value: Gender.FEMALE, iconName: "female" },
];

export default function GenderStep({ value, onChange }: GenderProps) {
  return (
    <View className="flex-1">
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-2xl font-inter-bold text-neutral">
            Qual é o seu sexo biológico?
          </Text>
          <Text className="text-base font-inter text-neutral/60">
            Isso influencia diretamente no cálculo da sua taxa metabólica basal.
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
                <Text
                  className={`font-inter-bold text-base ${
                    isActive ? "text-primary" : "text-neutral"
                  }`}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
