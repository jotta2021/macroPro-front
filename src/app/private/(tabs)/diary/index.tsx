import { apiKeys } from "@/core/apiKeys";
import { localesPTBR } from "@/hook/calendar-locales";
import getSumary from "@/services/sumary-service";
import Colors from "@/shared/theme/colors.json";
import BottomSheet from "@/shared/ui/templates/bottom-sheet";
import { BottomSheetMethods } from "@/shared/ui/templates/bottom-sheet/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderDiary from "../../_components/diary/header";
import MealList from "../../_components/diary/mealList";
import SummaryCard from "../../_components/diary/summaryCard";
import SummaryLoading from "../../_components/diary/summaryLoading";

localesPTBR();
export default function Home() {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const { data, isPending } = useQuery({
    queryKey: [apiKeys.summary, selectedDate],
    queryFn: () => getSumary(selectedDate),
    enabled: !!selectedDate,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1" edges={["top"]}>
        {isPending ? (
          <View className="flex px-6 mt-14">
            <SummaryLoading />
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            contentContainerClassName="px-6 py-6 gap-4"
            showsVerticalScrollIndicator={false}
          >
            <HeaderDiary
              openCalendar={() => sheetRef.current?.snapToIndex(0)}
            />
            {data && <SummaryCard data={data.dailySummary} />}

            <View>
              <MealList meals={data?.meals} />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["70%", "90%"]}
        backgroundColor="#fff"
        backdropOpacity={0.6}
        borderRadius={28}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 24, gap: 16 }}
        >
          <Text className="text-neutral text-lg font-inter-bold text-center">
            Selecione uma data
          </Text>
          <Calendar
            theme={{
              calendarBackground: "#fff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: Colors.primary,
              selectedDayTextColor: "#000",
              todayTextColor: Colors.primaryDark,
              dayTextColor: "#000",
              textDisabledColor: "#444",
            }}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: Colors.primary,
              },
            }}
          />
        </ScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
