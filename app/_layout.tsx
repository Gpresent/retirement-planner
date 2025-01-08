import { Stack, useRouter, RelativePathString } from "expo-router";
import React, { useEffect, useContext, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProvider, AppContext } from "../context/AppContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

function App() {
  const { setUserData, setOnboardingStatus } = useContext(AppContext);
  const [initialRoute, setInitialRoute] = useState<string | null>(null); // Tracks the target route
  const router = useRouter();

  useEffect(() => {
    const loadAppData = async () => {
      try {
        await AsyncStorage.clear(); // Remove any existing data for testing purposes
        // Safely retrieve and parse user data
        const userDataString = await AsyncStorage.getItem("user_data");
        const onboardingStatusString = await AsyncStorage.getItem("onboarding_status");

        // Parse only if data exists
        const uData = userDataString ? JSON.parse(userDataString) : null;
        const oStatus = onboardingStatusString
          ? JSON.parse(onboardingStatusString)
          : { step: 0 }; // Default onboarding status with step 0
        setUserData(uData);
        setOnboardingStatus(oStatus);
        setInitialRoute(oStatus.step < 3 ? "./onboarding" : "./");

        console.log("Loaded user data:", uData);
        console.log("Loaded onboarding status:", oStatus);

      } catch (error) {
        console.error("Error loading app data:", error);
      }
    };

    loadAppData();
  }, []);



  useEffect(() => {
    const performNavigation = async () => {
      if (initialRoute) { // Wait for navigation to complete
        if (initialRoute === "./onboarding") await router.push(initialRoute);
        await SplashScreen.hideAsync(); // Hide splash screen after navigation
      }
    };

    if (initialRoute) {
      performNavigation();
    }
  }, [initialRoute]); // Re-run navigation when initialRoute is set

  if (!initialRoute) {
    return null;
  }

  // Render the appropriate screen directly without using navigation animations
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>);
}
