import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}
export default function CustomButton({
  onPress,
  title,
  loading,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-primary w-full py-4 rounded-2xl shadow-lg active:bg-primary/80 items-center flex-row gap-2 justify-center"
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text className="text-white font-inter-bold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
