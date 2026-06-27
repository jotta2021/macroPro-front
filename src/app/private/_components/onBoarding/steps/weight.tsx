import Colors from "@/shared/theme/colors.json";
import { Ruler } from "@/shared/ui/base/ruler";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
interface WeightProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Weight({ value, onChange }: WeightProps) {
  const isValid = Number(value) > 0 && Number(value) < 300;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <Text className="text-6xl font-inter-bold text-neutral/80 text-center">
            {value}
            <Text className="text-base">kg</Text>
          </Text>
          <View className="gap-2">
            <Ruler
              height={120}
              width={380}
              minValue={30}
              maxValue={300}
              step={18}
              tickColor={Colors.neutralLight}
              activeTickColor={Colors.neutral}
              cursorColor={Colors.neutral}
              showCursor
              enableHaptics
              tickHeights={{ small: 20, medium: 28, large: 40 }}
              onValueChange={(val: number) => onChange(String(val))}
            />

            {value !== "" && !isValid && (
              <Text className="text-red-400 font-inter text-sm">
                Insira um peso válido entre 1 e 299 kg.
              </Text>
            )}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
