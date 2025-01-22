import React, { useContext } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AppContext, AppProvider } from "../../context/AppContext";
import * as SplashScreen from "expo-splash-screen";
import OnboardingScreen from "../(onboarding)/onboarding";
import { Dimensions } from 'react-native';
import { Stack } from 'expo-router';

const data = {
  labels: ['Current Age', 'FRA', '90'],
  datasets: [
    {
      data: [0, 3000, 6000],
      strokeWidth: 2, // Optional: line stroke width
    },
    {
      data: [0, 0, 10000],
      strokeWidth: 2, // Optional: line stroke width
    }
  ]
};

export default function Index() {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const { onboardingStatus } = useContext(AppContext);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  if (onboardingStatus.step < 0) {
    return null;
  }
  else if (onboardingStatus.step < 3) {
    SplashScreen.hideAsync();
    return <OnboardingScreen />;
  }

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
    
  );
}