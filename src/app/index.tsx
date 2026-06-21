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
      floatingCards: [
        {
          icon: "🥩",
          label: "Proteína",
          value: "250g / dia",
          color: "#EF4444",
          position: { top: 10, left: -16 },
          delay: 0,
        },
        {
          icon: "🍚",
          label: "Carboidrato",
          value: "340g / dia",
          color: "#F59E0B",
          position: { top: 80, right: -16 },
          delay: 120,
        },
        {
          icon: "🔥",
          label: "Calorias",
          value: "2.450 kcal",
          color: "#7ED957",
          position: { bottom: 20, left: -10 },
          delay: 240,
        },
      ],
    },
    {
      id: "2",
      title: "Tire Foto e Registre",
      description:
        "Basta tirar uma foto do seu prato! Nosso sistema analisa o alimento e calcula os nutrientes automaticamente para o seu diário.",
      image: require("../../assets/images/photo.png"),
      floatingCards: [
        {
          icon: "🤖",
          label: "IA detectou",
          value: "Frango + Arroz",
          color: "#8B5CF6",
          position: { top: 10, right: -16 },
          delay: 0,
        },
        {
          icon: "⚡",
          label: "Análise",
          value: "em 2 segundos",
          color: "#06B6D4",
          position: { bottom: 30, left: -16 },
          delay: 150,
        },
        {
          icon: "📊",
          label: "Precisão",
          value: "98% acurácia",
          color: "#7ED957",
          position: { top: 90, left: -10 },
          delay: 280,
        },
      ],
    },
    {
      id: "3",
      title: "Compartilhe no Feed",
      description:
        "Publique fotos de suas refeições dentro do app, compartilhe receitas saudáveis e inspire a comunidade.",
      image: require("../../assets/images/social.png"),
      floatingCards: [
        {
          icon: "❤️",
          label: "Curtidas",
          value: "1.248 hoje",
          color: "#EC4899",
          position: { top: 10, right: -16 },
          delay: 0,
        },
        {
          icon: "👥",
          label: "Comunidade",
          value: "+12k usuários",
          color: "#7ED957",
          position: { bottom: 30, left: -16 },
          delay: 140,
        },
        {
          icon: "🏆",
          label: "Streak",
          value: "21 dias",
          color: "#F59E0B",
          position: { top: 85, left: -10 },
          delay: 260,
        },
      ],
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
