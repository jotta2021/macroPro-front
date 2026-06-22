import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Started() {
  return (
    <SafeAreaView className="flex-1 px-6 justify-between py-6">
      {/* Top Header Section */}
      <View className="items-center justify-center">
        <Image
          source={require("../../assets/images/gainz.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View className="items-center justify-center flex-1 pt-12">
        <Image
          source={require("../../assets/images/started-icon.gif")}
          style={{ width: 110, height: 110, borderRadius: 55 }}
        />

        <Text className="text-3xl font-inter-bold text-neutral text-center leading-tight mb-3">
          Seja bem-vindo
        </Text>

        <Text className="text-neutral/60 font-inter text-base text-center px-4 leading-relaxed">
          Crie sua conta e comece a alcançar seus objetivos hoje.
        </Text>
      </View>

      {/* Bottom Actions Section */}
      <View className="w-full pb-8">
        {/* Create Account Button (Primary) */}
        <TouchableOpacity
          onPress={() => router.push("/register")}
          activeOpacity={0.85}
          className="bg-primary w-full py-4 rounded-2xl items-center justify-center shadow-md active:opacity-90 mb-4"
          style={{
            shadowColor: "#7ED957",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text className="text-white font-inter-bold text-lg">
            Criar conta
          </Text>
        </TouchableOpacity>

        {/* Google Button (Secondary) */}
        <TouchableOpacity
          onPress={() => console.log("Google Sign-In")}
          activeOpacity={0.85}
          className="flex flex-row items-center justify-center w-full border border-gray-200 bg-white py-4 rounded-2xl active:bg-gray-50 mb-6"
          style={{ gap: 12 }}
        >
          <Image
            source={require("../../assets/images/google.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text className="text-neutral font-inter-bold text-base">
            Continue com Google
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-neutral/50 font-inter text-sm">
            Já tem uma conta?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-primary font-inter-bold text-sm">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
