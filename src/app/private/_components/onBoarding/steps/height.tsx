import Input from "@/shared/ui/input";
import { Text, View } from "react-native";

interface HeightProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Height({ value, onChange }: HeightProps) {
  const isValid = Number(value) > 0 && Number(value) < 300;

  return (
    <View className="flex-1">
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-2xl font-inter-bold text-neutral">
            Qual é a sua altura?
          </Text>
          <Text className="text-base font-inter text-neutral/60">
            Informe sua altura em centímetros (cm) para completar seu perfil
            físico.
          </Text>
        </View>

        <View className="gap-2">
          <Input
            placeholder="Ex: 175"
            value={value}
            onChange={onChange}
            keyboardType="numeric"
            maxLength={3}
          />
          <Text className="text-neutral/40 font-inter text-sm">
            Altura em cm
          </Text>
          {value !== "" && !isValid && (
            <Text className="text-red-400 font-inter text-sm">
              Insira uma altura válida entre 1 e 299 cm.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
