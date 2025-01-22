import { SplashScreen, Stack } from "expo-router";
import React, { useContext } from "react";
import { AppContext, AppProvider } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  AsyncStorage.clear(); // Remove any existing data for testing purposes
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
