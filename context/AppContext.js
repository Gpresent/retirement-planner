import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [onboardingStatus, setOnboardingStatus] = useState({ step: -1 });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Keep the splash screen visible while loading resources
    SplashScreen.preventAutoHideAsync();

    const loadAppData = async () => {
      try {
        const storedUserData = JSON.parse(await AsyncStorage.getItem("user_data")) || null;
        const storedOnboardingStatus = JSON.parse(await AsyncStorage.getItem("onboarding_status")) || { step: 0 };

        setUserData(storedUserData);
        setOnboardingStatus(storedOnboardingStatus);
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    const prepareApp = async () => {
      try {
        // Load data
        await loadAppData();

        // Mark app as ready
        setAppReady(true);
      } catch (error) {
        console.error("Error during app preparation:", error);
      } finally {
        // Hide splash screen
        SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  const updateOnboardingStatus = async (newStatus) => {
    try {
      setOnboardingStatus(newStatus); // Update in memory
      await AsyncStorage.setItem("onboarding_status", JSON.stringify(newStatus)); // Persist to AsyncStorage
    } catch (error) {
      console.error("Error updating onboarding status:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        onboardingStatus,
        setOnboardingStatus: updateOnboardingStatus, // Use the async function to keep them in sync
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
