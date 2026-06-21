import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface PaginationDotProps {
  isActive: boolean;
}

export function PaginationDot({ isActive }: PaginationDotProps) {
  const widthAnim = useRef(new Animated.Value(8)).current; // w-2
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: isActive ? 24 : 8, // w-6 active, w-2 inactive
        duration: 250,
        useNativeDriver: false, // width change cannot use native driver
      }),
      Animated.timing(colorAnim, {
        toValue: isActive ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#CDFFB1", "#7ED957"], // bg-purple-200 to bg-purple-600
  });

  return (
    <Animated.View
      style={{
        width: widthAnim,
        height: 8,
        borderRadius: 4,
        backgroundColor,
        marginHorizontal: 5,
      }}
    />
  );
}
