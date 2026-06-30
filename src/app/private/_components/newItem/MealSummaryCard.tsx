import { MealResponse } from "@/models/meals-model";
import Colors from "@/shared/theme/colors.json";
import { AnimatedProgressBar } from "@/shared/ui/organisms/progress";
import { Text, View } from "react-native";

// ---------------------------------------------------------------------------
// MacroRow — uma linha com label, barra de progresso e "consumido / meta"
// ---------------------------------------------------------------------------
interface MacroRowProps {
  label: string;
  consumed: number;
  target: number;
  color: string;
  unit?: string;
}

function MacroRow({
  label,
  consumed,
  target,
  color,
  unit = "g",
}: MacroRowProps) {
  const progress = target > 0 ? Math.min(consumed / target, 1) : 0;

  return (
    <View className="flex-row items-center gap-3 mb-3">
      {/* Label */}
      <Text
        className="text-neutralLight font-inter text-xs w-16"
        numberOfLines={1}
      >
        {label}
      </Text>

      {/* Bar */}
      <View className="flex-1">
        <AnimatedProgressBar progress={progress} progressColor={color} />
      </View>

      {/* Values */}
      <Text className="text-neutral font-inter-medium text-xs w-20 text-right">
        {consumed.toFixed(0)}
        {unit} / {target.toFixed(0)}
        {unit}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// MealSummaryCard
// ---------------------------------------------------------------------------
interface MealSummaryCardProps {
  meal: MealResponse;
}

export function MealSummaryCard({ meal }: MealSummaryCardProps) {
  const consumed = {
    cal: meal.totalCalories ?? 0,
    carbo: meal.totalCarbo ?? 0,
    protein: meal.totalProtein ?? 0,
    fat: meal.totalFat ?? 0,
  };
  const target = {
    cal: meal.targetCalories ?? 0,
    carbo: meal.targetCarbo ?? 0,
    protein: meal.targetProtein ?? 0,
    fat: meal.targetFat ?? 0,
  };

  const calProgress =
    target.cal > 0 ? Math.min(consumed.cal / target.cal, 1) : 0;
  const remaining = Math.max(target.cal - consumed.cal, 0).toFixed(0);

  return (
    <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm shadow-black/5 mb-4">
      {/* Header */}
      <Text className="text-base font-inter-bold text-neutral mb-4">
        Resumo da refeição
      </Text>

      {/* Calories overview */}
      <View className="flex-row items-center justify-between mb-5">
        {/* Consumed */}
        <View className="items-center flex-1">
          <Text className="text-base font-inter-bold text-neutral">
            {consumed.cal.toFixed(0)}
          </Text>
          <Text className="text-xs font-inter text-neutralLight mt-0.5">
            Consumidas
          </Text>
        </View>

        {/* Center — remaining + ring */}
        <View className="items-center flex-1">
          <View
            className="w-20 h-20 rounded-full items-center justify-center"
            style={{
              borderWidth: 6,
              borderColor: calProgress >= 1 ? Colors.secondary : Colors.primary,
              backgroundColor: "#fff",
            }}
          >
            <Text className="text-xl font-inter-bold text-neutral">
              {remaining}
            </Text>
            <Text className="text-[9px] font-inter text-neutralLight">
              Restantes
            </Text>
          </View>
        </View>

        {/* Target */}
        <View className="items-center flex-1">
          <Text className="text-base font-inter-bold text-neutral">
            {target.cal.toFixed(0)}
          </Text>
          <Text className="text-xs font-inter text-neutralLight mt-0.5">
            Meta
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="border-b border-gray-100 mb-4" />

      {/* Macro rows */}
      <MacroRow
        label="Carboidratos"
        consumed={consumed.carbo}
        target={target.carbo}
        color={Colors.primary}
      />
      <MacroRow
        label="Proteína"
        consumed={consumed.protein}
        target={target.protein}
        color={Colors.secondary}
      />
      <MacroRow
        label="Gordura"
        consumed={consumed.fat}
        target={target.fat}
        color="#A78BFA"
      />
    </View>
  );
}
