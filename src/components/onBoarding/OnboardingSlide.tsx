import { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";

export interface FloatingCard {
  icon: string;
  label: string;
  value: string;
  color: string;
  position: { top?: number; bottom?: number; left?: number; right?: number };
  delay: number;
}

export interface SlideData {
  id: string;
  title: string;
  description: string;
  image: any;
  floatingCards?: FloatingCard[];
}

interface OnboardingSlideProps {
  slide: SlideData;
  isActive: boolean;
}

function FloatingCardItem({
  card,
  isActive,
  baseDelay,
}: {
  card: FloatingCard;
  isActive: boolean;
  baseDelay: number;
}) {
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.7)).current;
  const cardTranslateY = useRef(new Animated.Value(12)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      cardFade.setValue(0);
      cardScale.setValue(0.7);
      cardTranslateY.setValue(12);

      setTimeout(() => {
        Animated.parallel([
          Animated.spring(cardScale, {
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.timing(cardFade, {
            toValue: 1,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(cardTranslateY, {
            toValue: 0,
            duration: 320,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Gentle floating loop after entrance
          Animated.loop(
            Animated.sequence([
              Animated.timing(floatAnim, {
                toValue: -5,
                duration: 1800,
                useNativeDriver: true,
              }),
              Animated.timing(floatAnim, {
                toValue: 0,
                duration: 1800,
                useNativeDriver: true,
              }),
            ]),
          ).start();
        });
      }, baseDelay + card.delay);
    } else {
      cardFade.setValue(0);
      cardScale.setValue(0.7);
      floatAnim.stopAnimation();
      floatAnim.setValue(0);
    }
  }, [isActive]);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          ...card.position,
          opacity: cardFade,
          transform: [
            { scale: cardScale },
            { translateY: Animated.add(cardTranslateY, floatAnim) },
          ],
          backgroundColor: "rgba(255,255,255,0.92)",
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 6,
          borderLeftWidth: 3,
          borderLeftColor: card.color,
          minWidth: 130,
        },
      ]}
    >
      <Text style={{ fontSize: 20 }}>{card.icon}</Text>
      <View>
        <Text
          style={{
            fontSize: 10,
            color: "#9CA3AF",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {card.label}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#1F2937",
            fontWeight: "700",
          }}
        >
          {card.value}
        </Text>
      </View>
    </Animated.View>
  );
}

export function OnboardingSlide({ slide, isActive }: OnboardingSlideProps) {
  const imageFade = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.85)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (isActive) {
      imageFade.setValue(0);
      imageScale.setValue(0.85);
      textFade.setValue(0);
      textSlide.setValue(20);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(imageFade, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(imageScale, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(textFade, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(textSlide, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      // Smooth fade out when swiping away
      Animated.parallel([
        Animated.timing(imageFade, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(textFade, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      className="px-6"
    >
      {/* Image container with floating cards overlay */}
      <View style={{ width: 288, height: 288, marginBottom: 24 }}>
        <Animated.View
          style={{
            opacity: imageFade,
            transform: [{ scale: imageScale }],
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={slide.image}
            style={{
              width: 400,
              height: 400,
              resizeMode: "contain",
            }}
          />
        </Animated.View>

        {/* Floating Cards */}
        {slide.floatingCards?.map((card, idx) => (
          <FloatingCardItem
            key={idx}
            card={card}
            isActive={isActive}
            baseDelay={500}
          />
        ))}
      </View>

      <Animated.View
        style={{
          opacity: textFade,
          transform: [{ translateY: textSlide }],
          alignItems: "center",
        }}
      >
        <Text className="text-neutral-800 text-3xl font-inter-bold text-center mb-4 px-2 leading-tight">
          {slide.title}
        </Text>
        <Text className="text-neutral-600 text-base font-inter text-center px-6 leading-relaxed">
          {slide.description}
        </Text>
      </Animated.View>
    </View>
  );
}
