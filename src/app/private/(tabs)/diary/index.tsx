import { apiKeys } from "@/core/apiKeys";
import getSumary from "@/services/sumary-service";
import { useQuery } from "@tanstack/react-query";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderDiary from "./_components/header";
import SummaryCard from "./_components/summaryCard";

export default function Home() {
  const { data, isPending } = useQuery({
    queryKey: [apiKeys.summary],
    queryFn: () => getSumary(new Date().toISOString().split("T")[0]),
  });

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <HeaderDiary />
        <SummaryCard data={data} />
      </ScrollView>
    </SafeAreaView>
  );
}
