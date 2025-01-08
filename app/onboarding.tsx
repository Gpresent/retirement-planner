import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AppContext } from "../context/AppContext";

export default function OnboardingScreen() {
  const { onboardingStatus, setOnboardingStatus } = useContext(AppContext);
  const router = useRouter();

  const completeOnboardingStep = async () => {
    const newStatus = { ...onboardingStatus, step: onboardingStatus.step + 1 };
    setOnboardingStatus(newStatus);
    
    // Navigate to the next step or home
    if (newStatus.step >= 3) {
      router.push("./");
    }
    await AsyncStorage.setItem("onboarding_status", JSON.stringify(newStatus));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Onboarding Step {onboardingStatus?.step || 0}</Text>
      <Button title="Next Step" onPress={completeOnboardingStep} />
    </View>
  );
}
