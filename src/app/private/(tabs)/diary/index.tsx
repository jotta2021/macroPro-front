import { apiKeys } from "@/core/apiKeys";
import getSumary from "@/services/sumary-service";
import Colors from "@/shared/theme/colors.json";
import { Shimmer, ShimmerGroup } from "@/shared/ui/molecules/Shimmer/Shimmer";
import BottomSheet from "@/shared/ui/templates/bottom-sheet";
import { BottomSheetMethods } from "@/shared/ui/templates/bottom-sheet/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderDiary from "./_components/header";
import SummaryCard from "./_components/summaryCard";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";
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
            <ShimmerGroup isLoading={isPending}>
              <Shimmer
                preset="neutral"
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: 16,
                }}
              ></Shimmer>
              <View className="flex gap-4 py-4">
                <Shimmer
                  preset="neutral"
                  style={{
                    width: "100%",
                    height: 30,
                    borderRadius: 16,
                  }}
                ></Shimmer>
                <Shimmer
                  preset="neutral"
                  style={{
                    width: "100%",
                    height: 30,
                    borderRadius: 16,
                  }}
                ></Shimmer>
              </View>
            </ShimmerGroup>
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
            {data && <SummaryCard data={data} />}
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
