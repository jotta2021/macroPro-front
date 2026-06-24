import { Image, Text, View } from "react-native";

export default function Intro() {
  return (
    <View className="flex-1 justify-between">
      <View className="gap-2">
        <Text className="text-2xl font-inter-bold text-neutral">
          Seja bem vindo ao Gainz
        </Text>
        <Text className="text-base font-inter text-neutral/60">
          Para montar o seu planejamento alimentar, vamos precisar que você
          responda algumas perguntas
        </Text>
      </View>

      <View className="flex items-center">
        <Image
          source={require("../../../../../../assets/images/onboarding.png")}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
