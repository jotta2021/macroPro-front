import { DailyResume } from "@/models/sumary-model";
import Colors from "@/shared/theme/colors.json";
import { CircularProgress } from "@/shared/ui/organisms/circular-progress";
import { AnimatedProgressBar } from "@/shared/ui/organisms/progress";
import { Text, TouchableOpacity, View } from "react-native";

interface MacroBarProps {
  label: string;
  current: number;
  total: number;
  color: string;
}

function MacroBar({ label, current, total, color }: MacroBarProps) {
  const progress = total > 0 ? Math.min(current / total, 1) : 0;

  return (
    <View className="flex-1 items-center gap-1">
      <Text className="text-xs font-inter text-neutralLight">{label}</Text>
      <AnimatedProgressBar progress={progress} progressColor={color} />
      <Text className="text-xs font-inter-medium text-neutral">
        {current} / {total} g
      </Text>
    </View>
  );
}

interface SummaryCardProps {
  data: DailyResume;
  onDetailsPress?: () => void;
}

export default function SummaryCard({
  data,
  onDetailsPress,
}: SummaryCardProps) {
  const {
    caloriesConsumed,
    caloriesTarget,
    carboConsumed,
    carboTarget,
    proteinConsumed,
    proteinTarget,
    fatConsumed,
    fatTarget,
  } = data;

  const caloriesProgress =
    caloriesTarget > 0 ? Math.min(caloriesConsumed / caloriesTarget, 1) : 0;
  const remaining = Math.max(caloriesTarget - caloriesConsumed, 0).toFixed(0);

  return (
    <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm shadow-black/5">
      {/* Header row */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-inter-bold text-neutral">Resumo</Text>
        <TouchableOpacity onPress={onDetailsPress} activeOpacity={0.7}>
          <Text className="text-sm font-inter-semibold text-primary">
            Detalhes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calories row */}
      <View className="flex-row items-center justify-between mb-5">
        {/* Consumed */}
        <View className="items-center flex-1">
          <Text className="text-xl font-inter-bold text-neutral">
            {caloriesConsumed.toLocaleString("pt-BR")}
          </Text>
          <Text className="text-xs font-inter text-neutralLight mt-0.5">
            Consumidas
          </Text>
        </View>

        {/* Circular progress */}
        <CircularProgress
          progress={caloriesProgress}
          size={100}
          strokeWidth={8}
          outerCircleColor="#F3F4F6"
          progressCircleColor={Colors.primary}
          backgroundColor="#ffffff"
          renderIcon={() => (
            <View className="items-center">
              <Text className="text-xl font-inter-bold text-neutral">
                {remaining}
              </Text>
              <Text className="text-[10px] font-inter text-neutralLight">
                Restantes
              </Text>
            </View>
          )}
        />

        {/* Goal */}
        <View className="items-center flex-1">
          <Text className="text-xl font-inter-bold text-neutral">
            {caloriesTarget.toLocaleString("pt-BR")}
          </Text>
          <Text className="text-xs font-inter text-neutralLight mt-0.5">
            Meta
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="border-b border-gray-100 mb-4" />

      {/* Macro bars */}
      <View className="flex-row gap-3">
        <MacroBar
          label="Carboidratos"
          current={carboConsumed}
          total={carboTarget}
          color={Colors.primary}
        />
        <MacroBar
          label="Proteína"
          current={proteinConsumed}
          total={proteinTarget}
          color={Colors.secondary}
        />
        <MacroBar
          label="Gordura"
          current={fatConsumed}
          total={fatTarget}
          color="#A78BFA"
        />
      </View>
    </View>
  );
}
