import Colors from "@/shared/theme/colors.json";
import { Ruler } from "@/shared/ui/base/ruler";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface HeightProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Height({ value, onChange }: HeightProps) {
  const isValid = Number(value) > 0 && Number(value) < 300;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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

          <Text className="text-6xl font-inter-bold text-neutral/80 text-center">
            {value}
            <Text className="text-base">cm</Text>
          </Text>

          <View className="gap-2">
            <Ruler
              height={120}
              width={380}
              minValue={100}
              maxValue={250}
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
                Insira uma altura válida entre 1 e 299 cm.
              </Text>
            )}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
