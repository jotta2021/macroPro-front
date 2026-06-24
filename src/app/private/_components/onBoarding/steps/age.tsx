import Input from "@/shared/ui/input";
import { Text, View } from "react-native";

interface AgeProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Age({ value, onChange }: AgeProps) {
  const isValid = Number(value) > 0 && Number(value) < 120;

  return (
    <View className="flex-1">
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-2xl font-inter-bold text-neutral">
            Qual é a sua idade?
          </Text>
          <Text className="text-base font-inter text-neutral/60">
            Sua idade nos ajuda a calcular suas necessidades calóricas com mais
            precisão.
          </Text>
        </View>

        <View className="gap-2">
          <Input
            placeholder="Ex: 25"
            value={value}
            onChange={onChange}
            keyboardType="numeric"
            maxLength={3}
            className="h-10"
          />
          {value !== "" && !isValid && (
            <Text className="text-red-400 font-inter text-sm">
              Insira uma idade válida entre 1 e 119 anos.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
