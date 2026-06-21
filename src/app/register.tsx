import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

// ─── Zod Schema ──────────────────────────────────────────────────────────────
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(80, "Nome muito longo")
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome deve conter apenas letras"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um número"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Component ───────────────────────────────────────────────────────────────
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // TODO: Integrar com a API de cadastro
      console.log("Register data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // simula chamada
      // router.replace("/home");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Integrar com Google OAuth
    console.log("Google sign-in");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ── */}
          <View className="items-center pt-6 pb-2 px-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="self-start p-2 -ml-2 mb-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2228" />
            </TouchableOpacity>

            <View className="w-16 h-16 rounded-2xl bg-white items-center justify-center shadow-md mb-4">
              <Text style={{ fontSize: 32 }}>🥗</Text>
            </View>

            <Text className="text-neutral font-inter-bold text-2xl mb-1">
              Criar conta
            </Text>
            <Text className="text-neutral/60 font-inter text-sm text-center">
              Comece sua jornada rumo a uma vida mais saudável
            </Text>
          </View>

          {/* ── Card ── */}
          <View className="flex-1 bg-white mx-4 mt-4 mb-6 rounded-3xl px-6 pt-7 pb-8 shadow-sm">
            {/* Name */}
            <View className="mb-4">
              <Text className="text-neutral font-inter-semibold text-sm mb-2">
                Nome completo
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center border rounded-xl px-4 py-3 bg-gray-50 ${
                      errors.name ? "border-red-400" : "border-gray-200"
                    }`}
                  >
                    <Ionicons
                      name="person-outline"
                      size={18}
                      color={errors.name ? "#f87171" : "#9CA3AF"}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      className="flex-1 text-neutral font-inter text-base"
                      placeholder="Seu nome"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="words"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />
              {errors.name && (
                <View className="flex-row items-center mt-1.5 ml-1">
                  <Ionicons name="alert-circle" size={13} color="#f87171" />
                  <Text className="text-red-400 font-inter text-xs ml-1">
                    {errors.name.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-neutral font-inter-semibold text-sm mb-2">
                E-mail
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center border rounded-xl px-4 py-3 bg-gray-50 ${
                      errors.email ? "border-red-400" : "border-gray-200"
                    }`}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color={errors.email ? "#f87171" : "#9CA3AF"}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      className="flex-1 text-neutral font-inter text-base"
                      placeholder="seu@email.com"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <View className="flex-row items-center mt-1.5 ml-1">
                  <Ionicons name="alert-circle" size={13} color="#f87171" />
                  <Text className="text-red-400 font-inter text-xs ml-1">
                    {errors.email.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Password */}
            <View className="mb-4">
              <Text className="text-neutral font-inter-semibold text-sm mb-2">
                Senha
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center border rounded-xl px-4 py-3 bg-gray-50 ${
                      errors.password ? "border-red-400" : "border-gray-200"
                    }`}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color={errors.password ? "#f87171" : "#9CA3AF"}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      className="flex-1 text-neutral font-inter text-base"
                      placeholder="Mínimo 8 caracteres"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <Pressable
                      onPress={() => setShowPassword((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#9CA3AF"
                      />
                    </Pressable>
                  </View>
                )}
              />
              {errors.password && (
                <View className="flex-row items-center mt-1.5 ml-1">
                  <Ionicons name="alert-circle" size={13} color="#f87171" />
                  <Text className="text-red-400 font-inter text-xs ml-1">
                    {errors.password.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Confirm Password */}
            <View className="mb-6">
              <Text className="text-neutral font-inter-semibold text-sm mb-2">
                Confirmar senha
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center border rounded-xl px-4 py-3 bg-gray-50 ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                  >
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={18}
                      color={errors.confirmPassword ? "#f87171" : "#9CA3AF"}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      className="flex-1 text-neutral font-inter text-base"
                      placeholder="Repita sua senha"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#9CA3AF"
                      />
                    </Pressable>
                  </View>
                )}
              />
              {errors.confirmPassword && (
                <View className="flex-row items-center mt-1.5 ml-1">
                  <Ionicons name="alert-circle" size={13} color="#f87171" />
                  <Text className="text-red-400 font-inter text-xs ml-1">
                    {errors.confirmPassword.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.85}
              disabled={isLoading}
              className="bg-primary w-full py-4 rounded-2xl items-center justify-center shadow-sm active:opacity-80 mb-4"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-inter-bold text-base">
                  Criar conta
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-3 text-gray-400 font-inter text-xs">
                ou continue com
              </Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Google Button */}
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              activeOpacity={0.85}
              className="flex-row items-center justify-center border border-gray-200 rounded-2xl py-3.5 bg-white active:bg-gray-50"
            >
              {/* Google "G" logo inline SVG via text fallback */}
              <View
                style={{
                  width: 22,
                  height: 22,
                  marginRight: 10,
                  borderRadius: 4,
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/google.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <Text className="text-neutral font-inter-semibold text-sm">
                Entrar com Google
              </Text>
            </TouchableOpacity>

            {/* Login link */}
            <View className="flex-row justify-center mt-5">
              <Text className="text-gray-500 font-inter text-sm">
                Já tem uma conta?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-primary font-inter-bold text-sm">
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
