import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  OnboardingSlide,
  PaginationDot,
  SlideData,
} from "@/components/onBoarding";
import { router } from "expo-router";

export default function Index() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const slides: SlideData[] = [
    {
      id: "1",
      title: "Calcule seus Macros",
      description:
        "Descubra exatamente a quantidade de calorias e macronutrientes necessária para atingir seus objetivos de forma saudável.",
      image: require("../../assets/images/salad.png"),
    },
    {
      id: "2",
      title: "Tire Foto e Registre",
      description:
        "Basta tirar uma foto do seu prato! Nosso sistema analisa o alimento e calcula os nutrientes automaticamente para o seu diário.",
      image: require("../../assets/images/photo2.png"),
    },
    {
      id: "3",
      title: "Acompanhe seus Resultados",
      description:
        "Monitore sua evolução corporal, estabeleça novos hábitos e atinja suas metas de saúde de forma consistente e prática.",
      image: require("../../assets/images/social.png"),
    },
  ];

  const handleNext = () => {
    if (currentPage < slides.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      router.push("/started");
    }
  };

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <LinearGradient
      colors={["#7ED957", "#FFFFFF", "#FFFFFF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <PagerView
          ref={pagerRef}
          initialPage={0}
          onPageSelected={onPageSelected}
          style={{ flex: 1 }}
        >
          {slides.map((slide, index) => (
            <OnboardingSlide
              key={slide.id}
              slide={slide}
              isActive={index === currentPage}
            />
          ))}
        </PagerView>

        <View className="px-6 pb-8">
          {/* Animated Pagination Dots */}
          <View className="flex-row justify-center items-center mb-6">
            {slides.map((_, index) => (
              <PaginationDot key={index} isActive={index === currentPage} />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="bg-primary w-full py-4 rounded-2xl shadow-lg active:bg-primary/80 items-center justify-center"
          >
            <Text className="text-white font-inter-bold text-lg">
              {currentPage === slides.length - 1 ? "Começar" : "Avançar"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
