import LoadingPlan from "@/app/private/_components/onBoarding/loading";
import ActivityLevelStep from "@/app/private/_components/onBoarding/steps/activityLevel";
import Age from "@/app/private/_components/onBoarding/steps/age";
import GenderStep from "@/app/private/_components/onBoarding/steps/gender";
import GoalStep from "@/app/private/_components/onBoarding/steps/goal";
import Height from "@/app/private/_components/onBoarding/steps/height";
import Intro from "@/app/private/_components/onBoarding/steps/intro";
import Weight from "@/app/private/_components/onBoarding/steps/weight";
import { apiKeys } from "@/core/apiKeys";
import { ActivityLevel } from "@/enum/activitylevel-enum";
import { Gender } from "@/enum/gender-enum";
import { Goal } from "@/enum/goal-enum";
import queryClient from "@/lib/query-client";
import postProfile, { getProfile } from "@/services/profile-service";
import { AnimatedProgressBar } from "@/shared/ui/organisms/progress";
import { useOnboarding } from "@/store/onboarding";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toastColors } from "@/shared/theme/toast-colors";
import { useToast } from "@/shared/ui/molecules/Toast";

// Step 0 = intro (sem progresso visível), steps 1-6 = dados
const TOTAL_STEPS = 6;

export default function OnBoarding() {
  const [step, setStep] = useState(0);

  // Local string state for numeric inputs before converting
  const [ageInput, setAgeInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const toast = useToast();
  const {
    gender,
    activityLevel,
    goal,
    age,
    weight,
    height,
    setAge,
    setGender,
    setWeight,
    setHeight,
    setActivityLevel,
    setGoal,
    setProgress,
  } = useOnboarding();

  const { mutateAsync: createProfile, isPending } = useMutation({
    mutationFn: postProfile,
    onSuccess(res) {
      queryClient.invalidateQueries({ queryKey: [apiKeys.profile] });
      toast.show("Seu planejamento foi criado", {
        type: "success",
        backgroundColor: toastColors["success"],
        position: "top",
      });
      console.log(res);
    },
    onError(error) {
      toast.show(error.message, {
        type: "error",
        backgroundColor: toastColors["error"],
        position: "top",
      });
      console.log(error);
    },
  });

  const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
    queryFn: getProfile,
    queryKey: [apiKeys.profile],
    retry: false,
  });

  const goNext = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    // progress from 0 to 1 across steps 1–6
    setProgress(nextStep > 0 ? nextStep / TOTAL_STEPS : 0);
  };

  const goBack = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    setProgress(prevStep > 0 ? prevStep / TOTAL_STEPS : 0);
  };

  const handleFinish = async () => {
    setGoal(goal);
    setProgress(1);
    await createProfile({
      weight,
      height,
      activityLevel,
      goal,
      age,
      gender,
    });
  };

  const progress = step > 0 ? step / TOTAL_STEPS : 0;

  // Validation function for each step
  const isStepValid = () => {
    switch (step) {
      case 0:
        return true;
      case 1: // Age
        return Number(ageInput) > 0 && Number(ageInput) < 120;
      case 2: // Gender
        return true;
      case 3: // Weight
        return Number(weightInput) > 0 && Number(weightInput) < 300;
      case 4: // Height
        return Number(heightInput) > 0 && Number(heightInput) < 300;
      case 5: // Activity level
        return true;
      case 6: // Goal
        return true;
      default:
        return false;
    }
  };

  // Label configuration for bottom button
  const getButtonLabel = () => {
    if (step === 0) return "Começar";
    if (step === TOTAL_STEPS) return "Criar meu plano";
    return "Continuar";
  };

  const handleButtonPress = () => {
    if (step === TOTAL_STEPS) {
      handleFinish();
    } else {
      goNext();
    }
  };

  const steps = [
    {
      id: "intro",
      content: <Intro />,
    },
    {
      id: "age",
      content: (
        <Age
          value={ageInput}
          onChange={(val) => {
            setAgeInput(val);
            setAge(Number(val));
          }}
        />
      ),
    },
    {
      id: "gender",
      content: (
        <GenderStep value={gender} onChange={(val: Gender) => setGender(val)} />
      ),
    },
    {
      id: "weight",
      content: (
        <Weight
          value={weightInput}
          onChange={(val) => {
            setWeightInput(val);
            setWeight(Number(val));
          }}
        />
      ),
    },
    {
      id: "height",
      content: (
        <Height
          value={heightInput}
          onChange={(val) => {
            setHeightInput(val);
            setHeight(Number(val));
          }}
        />
      ),
    },
    {
      id: "activityLevel",
      content: (
        <ActivityLevelStep
          value={activityLevel}
          onChange={(val: ActivityLevel) => setActivityLevel(val)}
        />
      ),
    },
    {
      id: "goal",
      content: <GoalStep value={goal} onChange={(val: Goal) => setGoal(val)} />,
    },
  ];

  const isValid = isStepValid();

  useEffect(() => {
    if (dataProfile) {
      router.replace("/private/(tabs)/diary");
    }
  }, [dataProfile]);

  if (isLoadingProfile) {
    return (
      <SafeAreaView className="flex-1 bg-white" style={{ flex: 1 }}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <LoadingPlan />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="px-6 py-6 gap-6 flex-1 justify-between">
        <View className="gap-6 flex-1">
          <View className="flex-row items-center gap-3">
            {step > 0 && (
              <TouchableOpacity
                onPress={goBack}
                activeOpacity={0.7}
                className="w-9 h-9 items-center justify-center rounded-xl bg-gray-100"
              >
                <Ionicons name="chevron-back" size={20} color="#374151" />
              </TouchableOpacity>
            )}
            <View className="flex-1">
              <AnimatedProgressBar
                progress={progress}
                progressColor="#7ED957"
                trackColor="#E5E7EB"
              />
            </View>
          </View>

          <View className="flex-1 mt-10">{steps[step]?.content}</View>
        </View>

        {/* Global Action Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleButtonPress}
          disabled={!isValid || isPending}
          className={`w-full py-4 rounded-2xl items-center justify-center mb-4 ${
            isValid ? "bg-primary shadow-sm" : "bg-neutral/20"
          }`}
        >
          <Text
            className={`font-inter-bold text-base ${
              isValid ? "text-white" : "text-neutral/70"
            }`}
          >
            {getButtonLabel()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
