import Input from "@/shared/ui/input";
import { Text, View } from "react-native";

interface WeightProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Weight({ value, onChange }: WeightProps) {
  const isValid = Number(value) > 0 && Number(value) < 300;

  return (
    <View className="flex-1">
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-2xl font-inter-bold text-neutral">
            Qual é o seu peso atual?
          </Text>
          <Text className="text-base font-inter text-neutral/60">
            Informe seu peso em quilogramas (kg) para calcularmos suas metas
            nutricionais.
          </Text>
        </View>

        <View className="gap-2">
          <Input
            placeholder="Ex: 75"
            value={value}
            onChange={onChange}
            keyboardType="decimal-pad"
            maxLength={5}
          />
          <Text className="text-neutral/40 font-inter text-sm">
            Peso em kg
          </Text>
          {value !== "" && !isValid && (
            <Text className="text-red-400 font-inter text-sm">
              Insira um peso válido entre 1 e 299 kg.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
