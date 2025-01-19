import { Stack } from "expo-router";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProvider } from "../context/AppContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

function App() {
  
  AsyncStorage.clear(); // Remove any existing data for testing purposes
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
