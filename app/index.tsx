import React, { useContext, useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

const data = [
  {
    name: 'Current Age',
    withdrawalNow: 0,
  },
  {
    name: 'FRA',
    withdrawalNow: 3000,
    withdrawalAtFRA: 0
  },
  {
    name: '90',
    withdrawalNow: 6000,
    withdrawalAtFRA: 10000
  },
];

export default function Index() {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const { userData, onboardingStatus, setOnboardingStatus } = useContext(AppContext);
  const [isAppReady, setIsAppReady] = React.useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  useEffect(() => {
    const loadAppData = async () => {
      try {
        // Safely retrieve and parse user data
        const userData = JSON.parse(await AsyncStorage.getItem("user_data") || "{}");
        await setOnboardingStatus(JSON.parse(await AsyncStorage.getItem("onboarding_status") || '{"step": 0}'));

        console.log("Loaded user data:", userData);
        console.log("Loaded onboarding status:", onboardingStatus);

      } catch (error) {
        console.error("Error loading app data:", error);
      } finally {
        setIsAppReady(true); // Mark app as ready
        await SplashScreen.hideAsync(); // Hide splash screen
      }
    };

    loadAppData();
  },[]);

  if (!isAppReady) {
    return null;
  }
  if (onboardingStatus.step < 3) {
    SplashScreen.hideAsync();
    return <Redirect href="./onboarding" />;
  }

  return (
    <View
    style={{
    flex: 1,      justifyContent: "center",
      alignItems: "center",
    }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{marginRight: 10}}>Hello</Text>
          <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          onChange={onChange}
          />
      </SafeAreaView>
    </View>
  );
}
