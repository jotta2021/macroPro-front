import { apiKeys } from "@/core/apiKeys";
import {
  ActivityLevel,
  descriptionActivityLevel,
} from "@/enum/activitylevel-enum";
import { Gender, descriptionGender } from "@/enum/gender-enum";
import { Goal, descriptionGoal } from "@/enum/goal-enum";
import queryClient from "@/lib/query-client";
import { profileProps } from "@/models/profile-model";
import { putProfile } from "@/services/profile-service";
import CustomButton from "@/shared/ui/customButton";
import OptionSelector from "@/shared/ui/optionSelector";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toastColors } from "@/shared/theme/toast-colors";
import { useToast } from "@/shared/ui/molecules/Toast";
import { z } from "zod";
import Input from "../../shared/ui/input";

const editProfileSchema = z.object({
  weight: z
    .string()
    .min(1, "Peso é obrigatório")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Peso inválido"),
  height: z
    .string()
    .min(1, "Altura é obrigatória")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Altura inválida"),
  age: z
    .string()
    .min(1, "Idade é obrigatória")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) > 0 && Number(v) < 120,
      "Idade inválida",
    ),
  gender: z.enum(Gender),
  activityLevel: z.enum(ActivityLevel),
  goal: z.enum(Goal),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <View className="flex-row items-center mt-1.5 ml-1">
      <Ionicons name="alert-circle" size={13} color="#f87171" />
      <Text className="text-red-400 font-inter text-xs ml-1">{message}</Text>
    </View>
  );
}

export default function EditProfile() {
  const params = useLocalSearchParams<{
    weight?: string;
    height?: string;
    age?: string;
    gender?: string;
    activityLevel?: string;
    goal?: string;
  }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      weight: params.weight ?? "",
      height: params.height ?? "",
      age: params.age ?? "",
      gender: (params.gender as Gender) ?? undefined,
      activityLevel: (params.activityLevel as ActivityLevel) ?? undefined,
      goal: (params.goal as Goal) ?? undefined,
    },
  });
  const toast = useToast();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: putProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.profile] });
      toast.show("Perfil atualizado com sucesso!", {
        type: "success",
        backgroundColor: toastColors["success"],
        position: "top",
      });
      router.back();
    },
    onError: (error) => {
      toast.show(error?.message || "Ocorreu um erro", {
        type: "error",
        backgroundColor: toastColors["error"],
        position: "top",
      });
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
    const payload: Omit<
      profileProps,
      "dailyCalories" | "carbo" | "protein" | "fat"
    > = {
      weight: Number(data.weight),
      height: Number(data.height),
      age: Number(data.age),
      gender: data.gender,
      activityLevel: data.activityLevel,
      goal: data.goal,
    };
    await mutateAsync(payload);
  };

  const genderOptions = Object.values(Gender).map((v) => ({
    label: descriptionGender[v],
    value: v,
  }));

  const activityOptions = Object.values(ActivityLevel).map((v) => ({
    label: descriptionActivityLevel[v],
    value: v,
  }));

  const goalOptions = Object.values(Goal).map((v) => ({
    label: descriptionGoal[v],
    value: v,
  }));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Peso */}
          <View className="mb-5">
            <Text className="text-neutral font-inter-semibold text-sm mb-2">
              Peso (kg)
            </Text>
            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Ex: 75"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.weight}
                  keyboardType="decimal-pad"
                  icon={
                    <Ionicons
                      name="barbell-outline"
                      size={18}
                      color={errors.weight ? "#f87171" : "#9CA3AF"}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
              )}
            />
            <FieldError message={errors.weight?.message} />
          </View>
          <View className="mb-5">
            <Text className="text-neutral font-inter-semibold text-sm mb-2">
              Altura (cm)
            </Text>
            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Ex: 175"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.height}
                  keyboardType="decimal-pad"
                  icon={
                    <Ionicons
                      name="resize-outline"
                      size={18}
                      color={errors.height ? "#f87171" : "#9CA3AF"}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
              )}
            />
            <FieldError message={errors.height?.message} />
          </View>
          <View className="mb-5">
            <Text className="text-neutral font-inter-semibold text-sm mb-2">
              Idade
            </Text>
            <Controller
              control={control}
              name="age"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Ex: 25"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.age}
                  keyboardType="number-pad"
                  icon={
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={errors.age ? "#f87171" : "#9CA3AF"}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
              )}
            />
            <FieldError message={errors.age?.message} />
          </View>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <OptionSelector
                label="Gênero"
                options={genderOptions}
                value={value}
                onChange={onChange}
                error={errors.gender?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="activityLevel"
            render={({ field: { onChange, value } }) => (
              <OptionSelector
                label="Nível de Atividade"
                options={activityOptions}
                value={value}
                onChange={onChange}
                error={errors.activityLevel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="goal"
            render={({ field: { onChange, value } }) => (
              <OptionSelector
                label="Objetivo"
                options={goalOptions}
                value={value}
                onChange={onChange}
                error={errors.goal?.message}
              />
            )}
          />

          <CustomButton
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
            title="Salvar"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
