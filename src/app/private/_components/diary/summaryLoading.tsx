import { Shimmer, ShimmerGroup } from "@/shared/ui/molecules/Shimmer/Shimmer";
import { View } from "react-native";

export default function SummaryLoading() {
  return (
    <ShimmerGroup isLoading={true}>
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
  );
}
