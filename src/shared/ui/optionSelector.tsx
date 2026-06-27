import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function OptionSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: { label: string; value: T }[];
  value: T | undefined;
  onChange: (v: T) => void;
  error?: string;
}) {
  return (
    <View className="mb-5">
      <Text className="text-neutral font-inter-semibold text-sm mb-2">
        {label}
      </Text>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item: opt }) => {
          const selected = value === opt.value;
          return (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => onChange(opt.value)}
              className={`px-4 py-3 rounded-xl border ${
                selected
                  ? "bg-primary border-primary"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Text
                className={`font-inter-semibold text-sm ${
                  selected ? "text-white" : "text-neutral/70"
                }`}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {error && (
        <View className="flex-row items-center mt-1.5 ml-1">
          <Ionicons name="alert-circle" size={13} color="#f87171" />
          <Text className="text-red-400 font-inter text-xs ml-1">{error}</Text>
        </View>
      )}
    </View>
  );
}
