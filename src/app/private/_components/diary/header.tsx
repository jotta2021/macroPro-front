import Colors from "@/shared/theme/colors.json";
import { Entypo } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  openCalendar: () => void;
}

export default function HeaderDiary({ openCalendar }: Props) {
  const fire = 2;
  return (
    <View className="justify-between flex-row items-center">
      <Text className="text-2xl text-neutral font-inter-bold">Hoje</Text>

      <View className="flex-row gap-4 items-center">
        <View className="flex-row items-center gap-2 ">
          <Image
            source={require("../../../../../assets/images/fire.png")}
            style={{
              width: 24,
              height: 24,
              opacity: fire > 0 ? 1 : 0.4,
              tintColor: fire > 0 ? undefined : "#8F95A3",
            }}
          />
          <Text className="text-lg text-neutral font-inter-bold">10</Text>
        </View>
        <TouchableOpacity onPress={openCalendar} activeOpacity={0.7}>
          <Entypo name="calendar" size={24} color={Colors.neutral} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
