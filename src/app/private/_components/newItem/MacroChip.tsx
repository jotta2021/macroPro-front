import { Text, View } from "react-native";

export default function MacroChip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View
      className="flex-row items-center gap-0.5 px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}18` }}
    >
      <Text className="font-inter-semibold text-[10px]" style={{ color }}>
        {label}
      </Text>
      <Text className="font-inter text-[10px]" style={{ color }}>
        {value}g
      </Text>
    </View>
  );
}
