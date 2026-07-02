import Colors from "@/shared/theme/colors.json";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  openCalendar: () => void;
  consistenceDays?: number;
}

export default function HeaderDiary({
  openCalendar,
  consistenceDays = 0,
}: Props) {
  return (
    <View className="justify-between flex-row items-center">
      <Text className="text-2xl text-neutral font-inter-bold">Hoje</Text>

      <View className="flex-row gap-4 items-center">
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center gap-2 "
          onPress={() => router.push("/private/consistence")}
        >
          <Image
            source={require("../../../../../assets/images/fire.png")}
            style={{
              width: 24,
              height: 24,
              opacity: consistenceDays > 0 ? 1 : 0.4,
              tintColor: consistenceDays > 0 ? undefined : "#8F95A3",
            }}
          />
          <Text className="text-lg text-neutral font-inter-bold">
            {consistenceDays}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCalendar} activeOpacity={0.7}>
          <Entypo name="calendar" size={24} color={Colors.neutral} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
