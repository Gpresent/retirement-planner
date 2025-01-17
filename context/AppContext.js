import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [userData, setUserData] = useState(null); // In-memory user data
  const [onboardingStatus, setOnboardingStatus] = useState({ step: -1 }); // In-memory onboarding status

  // Load data from AsyncStorage on app start
  useEffect(() => {
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

    loadAppData();
  }, []);

  // Function to update onboarding status (updates both context and AsyncStorage)
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
