import React, { useContext } from "react";
import { View, Text, Button, TextInput, Switch } from "react-native";
import { AppContext } from "@/context/AppContext";
import questions from "@/constants/questions";
import DatePickerModal from "@/components/DatePickerModal";


export default function OnboardingScreen() {
  const { onboardingStatus, setOnboardingStatus, userData, setUserData } = useContext(AppContext);

  const completeOnboardingStep = async () => {
    const newUserData = {...userData, [questions[onboardingStatus.step].id]: "test"};
    const newStatus = { step: onboardingStatus.step + 1 };
    setOnboardingStatus(newStatus);
  };

  function formatPage(type: string) {
    const questionId = questions[onboardingStatus.step]?.id;
    const value = userData[questionId] || '';

    switch (type) {
      case "date":
        return (
          <DatePickerModal/>
        );
      case "number":
        return (
          <TextInput
            keyboardType="number-pad"
            value={value}
            onChangeText={(text) =>
              setUserData({ ...userData, [questionId]: text })
            }
          />
        );
      case "boolean":
        return (
          <Switch
            value={Boolean(value)}
            onValueChange={(newValue) =>
              setUserData({ ...userData, [questionId]: newValue })
            }
          />
        );
      default:
        return (
          <TextInput
            value={value}
            onChangeText={(text) =>
              setUserData({ ...userData, [questionId]: text })
            }
          />
        );
    }
  }
  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{questions[onboardingStatus?.step]?.question}</Text>
      <Text>Onboarding Step {onboardingStatus?.step || 0}</Text>
      {formatPage(questions[onboardingStatus?.step]?.type)}
      <Button title="Next Step" onPress={completeOnboardingStep} />
    </View>
  );
}